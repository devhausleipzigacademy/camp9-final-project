import React from 'react';
import Link from 'next/link';
import Form from './Form';

function page() {
  return (
    <div className="flex flex-col items-center bg-slate-400">
      <img src=""></img>
      <Form />
      <p>Don't have an account yet?</p>
      <Link href="/register">
        <p>Sign up!</p>
      </Link>
    </div>
  );
}

export default page;
