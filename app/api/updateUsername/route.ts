import { NextRequest, NextResponse } from 'next/server';
import { SignUpUser, UsernameType, signUpSchema, usernameSchema } from '@/types/user/AuthSchemata';
import { db } from '@/libs/db';

interface incomingData { 
  username: string, 
  userID: number 
}


interface IRequest extends NextRequest {
  json: () => Promise<incomingData>;
}

export async function POST(request: IRequest) {
  // console.log("Backend: api call made")
  const {username, userID} = await request.json();
  // console.log("BACKEND", username, userID )

  try {
    usernameSchema.parse({ username });
    // console.log("Backend: username passes schema")
  } catch (err) {
    return NextResponse.json('Invalid user input', { status: 422 });
  }

  try {
    // console.log("backend, userID:", userID, typeof(userID)  )
    const updatedUser = await db.user.update({
      where: {
        id: +userID, // <-- why do I need to conver to number here?
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