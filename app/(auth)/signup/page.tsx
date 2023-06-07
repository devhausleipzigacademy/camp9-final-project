import SignUpForm from '@/components/shared/forms/SignUpForm';
import React from 'react';
import { toast } from 'react-toastify';

function SignUp() {
  return (
    <div className="w-full h-full flex flex-col p-4 bg-green-600">
      <div className="w-[300px] h-[120px] bg-green-600 border-4 border-solid rounded-sm border-slate-800 flex justify-center items-center">
        <p>Placeholder Image</p>
      </div>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
