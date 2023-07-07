import LoginForm from '@/components/shared/forms/LoginForm';
import Link from 'next/link';
import React from 'react';

function Login() {
  return (
    <div className="flex flex-col justify-between gap-3">
      <div className="flex flex-col gap-9 justify-between">
        <h1 className="appName">d'accord</h1>
        <LoginForm />
      </div>
      <div className="flex flex-col justify-between">
        <p className="text-center body-semibold">Don't have an account?</p>
        <Link href={'/signup'} className="underline text-center body-semibold">
          Sign up!
        </Link>
      </div>
    </div>
  );
}

export default Login;
