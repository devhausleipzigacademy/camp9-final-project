import { NextRequest, NextResponse } from 'next/server';
import { confirmPasswordSchema } from '@/types/user/AuthSchemata';
import { db } from '@/libs/db';
import bcrypt from 'bcrypt';

interface incomingData {
  password: string;
  confirmPassword: string;
  userID: number;
}

interface IRequest extends NextRequest {
  json: () => Promise<incomingData>;
}

export async function POST(request: IRequest) {
  const { password, confirmPassword, userID } = await request.json();

  try {
    confirmPasswordSchema.parse({ password, confirmPassword });
  } catch (err) {
    return NextResponse.json('Invalid user input', { status: 422 });
  }

  // \/ would be better if password doesn't even make it to the backend
  const hashedPassword = await bcrypt.hash(password, 12); 

  try {
    const updatedUser = await db.user.update({
      where: {
        id: +userID, // <-- FIX: why do I need to conver to number here?
      },
      data: { password: hashedPassword },
    });
    return NextResponse.json(
      { user: { id: updatedUser.id, username: updatedUser.name } },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json('Update failed', { status: 422 });
  }
}
