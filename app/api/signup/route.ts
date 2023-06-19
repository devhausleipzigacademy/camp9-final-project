import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignUpUser, signUpSchema } from 'types/user/SignUpSchema';
import { db } from '@/libs/db';

interface IRequest extends NextRequest {
  json: () => Promise<SignUpUser>;
}

export async function POST(request: IRequest) {
  const { userName, password, confirmPassword } = await request.json();

  try {
    signUpSchema.parse({ userName, password, confirmPassword });
  } catch (err) {
    return NextResponse.json('Invalid user input', { status: 422 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = await db.user.create({
      data: { name: userName, password: hashedPassword },
    });
    return NextResponse.json(
      { user: { id: newUser.id, username: newUser.name } },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json('User already exists', { status: 422 });
  }
}