import { SignUpUser } from '@/types/user/SignUpSchema';
import { NextRequest, NextResponse } from 'next/server';
import bycrpt from 'bcrypt';
import { z } from 'zod';
import { db } from '@/libs/db';
//import { db } from '@/libs/db';

interface IRequest extends NextRequest {
  json: () => Promise<SignUpUser>;
}

export async function POST(request: IRequest) {
  const { userName, password } = await request.json();

  try {
    const userSchema = z.object({
      userName: z.string().min(3).max(20),
      password: z.string().min(8).max(100),
    });
    userSchema.parse({ userName, password });
  } catch (err) {
    return NextResponse.json('Invalid user input', { status: 422 });
  }

  const hashedPassword = await bycrpt.hash(password, 12);
  console.log(hashedPassword);
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
