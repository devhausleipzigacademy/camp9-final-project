import { db } from '@/libs/db';
import { loginSchema } from '@/types/user/LoginSchema';
import { hash, compare } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userName, password } = (await req.json()) as any;
    //const hashed_password = await hash(password, 12);

    // server side data validation with zod
    try {
      loginSchema.parse({ userName, password }); // <-- zod validation
    } catch (err) {
      return NextResponse.json('Invalid user input', { status: 422 });
    }

    // console.log('HEY', password, userName, hashed_password);

    const user = await db.user.findUnique({
      where: {
        name: userName,
      },
    });

    console.log("|||||||||||||||")

    compare(password, user!.password, function (err, isValid) {
      if (isValid) {
        console.log('hashed passwords match!1');
        return user;
      } else if (err) {
        console.log('ME?');
        return null;
      }
    });


  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: "ME?" + error.message,
      }),
      { status: 422 }
    );
  }
}

///

// import { NextRequest,  } from 'next/server';
// import bcrypt from 'bcrypt';
// import { loginSchema, LoginSchemaType } from '@/types/user/LoginSchema';

// interface IRequest extends NextRequest {
//   json: () => Promise<LoginSchemaType>;
// }

// export async function POST(request: IRequest) {
//   const { userName, password } = await request.json();

//   //this is the zod validation
//   try {
//     loginSchema.parse({ userName, password });
//   } catch (err) {
//     return NextResponse.json('Invalid user input', { status: 422 });
//   }

//   //hashing the password
//   const hashedPassword = await bcrypt.hash(password, 12);

//   //this is the the user creation
//   //the database has a unique requirement for the username
//   //if the username already exists, the database will throw an error
//   //if the username doesn't exist, the user will be created
//   //I am handling the creation and checking for the username in sweep

//   //its commented out because we don't have a database yet
//   try {
//     // const newUser = await db.user.create({
//     //   data: {
//     //     userName,
//     //     password: hashedPassword,
//     //   },
//     // });
//     return NextResponse.json('User log in details received', { status: 201 });
//   } catch (err) {
//     return NextResponse.json('User log in details received, error', { status: 422 });
//   }
// }
