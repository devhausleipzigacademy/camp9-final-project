import { db } from "@/libs/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userName, password } = (await req.json()) as any;
    const hashed_password = await hash(password, 12);

    console.log(password, userName, hashed_password)
    
    const user = await db.user.create({ // error here
      data: {
        name: userName,
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}