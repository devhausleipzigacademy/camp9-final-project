import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignUpSchema, signUpSchema } from '@/types/user/AuthSchemata';
import { db } from '@/libs/db';
import { Prisma } from '@prisma/client';

interface IRequest extends NextRequest {
  json: () => Promise<SignUpSchema>;
}

export async function POST(request: IRequest) {
  const { username, password, confirmPassword } = await request.json();

  try {
    signUpSchema.parse({ username, password, confirmPassword });
  } catch (err) {
    return NextResponse.json('Invalid user input', { status: 422 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = await db.user.create({
      data: { name: username, password: hashedPassword },
    });
    return NextResponse.json(
      { user: { id: newUser.id, username: newUser.name } },
      { status: 201 }
    );
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002'
    ) {
      return NextResponse.json('Username already exists', { status: 422 });
    }
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
