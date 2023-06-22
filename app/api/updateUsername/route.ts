import { NextRequest, NextResponse } from 'next/server';
import { usernameSchema } from '@/types/user/AuthSchemata';
import { db } from '@/libs/db';

interface incomingData { 
  username: string, 
  userID: number 
}

interface IRequest extends NextRequest {
  json: () => Promise<incomingData>;
}

export async function POST(request: IRequest) {
  const {username, userID} = await request.json();

  try {
    usernameSchema.parse({ username });
  } catch (err) {
    return NextResponse.json('Invalid user input', { status: 422 });
  }

  try {
    const updatedUser = await db.user.update({
      where: {
        id: +userID, // <-- FIX: why do I need to conver to number here?
      },
      data: { name: username,},
    });
    return NextResponse.json(
      { user: { id: updatedUser.id, username: updatedUser.name } },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json('Update failed', { status: 422 });
  }
}