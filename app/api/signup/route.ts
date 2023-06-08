import { SignUpUser, signUpSchema } from '@/types/user/SignUpSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';


interface IRequest extends NextRequest {
  json: () => Promise<SignUpUser>;
}

export async function POST(request: IRequest) {
  const { userName, password, confirmPassword } = await request.json();


  //this is the zod validation
  try {
    signUpSchema.parse({ userName, password, confirmPassword });
  } catch (err) {
    return NextResponse.json('Invalid user input', { status: 422 });
  }

  //hashing the password
  const hashedPassword = await bcrypt.hash(password, 12);


  //this is the the user creation
  //the database has a unique requirement for the username
  //if the username already exists, the database will throw an error
  //if the username doesn't exist, the user will be created
  //I am handling the creation and checking for the username in sweep

  //its commented out because we don't have a database yet
  try {
    // const newUser = await db.user.create({
    //   data: {
    //     userName,
    //     password: hashedPassword,
    //   },
    // });
    return NextResponse.json('User created', { status: 201 });
  } catch (err) {
    return NextResponse.json('User already exists', { status: 422 });
  }
}
