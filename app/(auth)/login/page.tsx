import LoginForm from '@/components/shared/forms/LoginForm';
import Link from 'next/link';
import React from 'react';

async function Login() {
  return (
    <div className="w-full h-full flex flex-col p-4 bg-yellow">
      <div className="w-[300px] h-[120px] border-4 border-solid rounded-sm border-slate-800 flex justify-center items-center">
        <p>Placeholder Image</p>
      </div>
      <LoginForm />
      <p className="text-center pt-5">Don't have an account?</p>
      <Link href={'/signup'} className="underline text-center">
        Sign up!
      </Link>
    </div>
  );
}

export default Login;
