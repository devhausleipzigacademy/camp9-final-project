import { db } from "@/libs/db";
import { signUpSchema } from "@/types/user/SignUpSchema";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userName, password, confirmPassword } = (await req.json()) as any;
    const hashed_password = await hash(password, 12);
    
    // server side data validation with zod
    try {
      signUpSchema.parse({ userName, password, confirmPassword });
    } catch (err) {
      return NextResponse.json('Invalid user input', { status: 422 });
    }

    const user = await db.user.create({
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