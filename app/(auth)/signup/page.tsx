import SignUpForm from 'components/shared/forms/SignUpForm';
import Link from 'next/link';
import React from 'react';

function SignUp() {
  return (
    <div className="page flex flex-col w-full h-full gap-8 bg-green-light">
      <div className="flex flex-col gap-9 justify-between">
        <h1 className="appName">d'accord</h1>
        <SignUpForm />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-center body-semibold">Already have an Account?</p>
        <Link href={'/login'} className="underline text-center body-semibold">
          Sign In!
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
