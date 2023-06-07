import { SignUpUser } from '@/types/user/SignUpSchema';
import { NextRequest, NextResponse } from 'next/server';
import bycrpt from 'bcrypt';
import { db } from '@/libs/db';

interface IRequest extends NextRequest {
  json: () => Promise<SignUpUser>;
}

export async function POST(request: IRequest) {
  console.log('request', request);
  const { userName, password } = await request.json();

  const hashedPassword = await bycrpt.hash(password, 12);

  try {
    const newUser = await db.user.create({
      data: {
        userName,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    return NextResponse.json('User already exists', { status: 422 });
  }
}
