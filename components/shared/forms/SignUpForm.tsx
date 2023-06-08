'use client';

import { SignUpUser, signUpSchema } from '@/types/user/SignUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';

type SignUpForm = React.FormHTMLAttributes<HTMLFormElement>;

async function signUpUser(user: SignUpUser) {
  const { data } = await axios.post('/api/signup', user, {
    withCredentials: true,
  });
  console.log(data);
  return data;
}

function SignUpForm() {
  const { mutate, isLoading, isError } = useMutation(signUpUser);

  const {
    //
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<SignUpUser>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpUser) => {
    mutate(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <input
        placeholder={'Username'}
        type="text"
        id={'userName'}
        {...register('userName')}
      ></input>
      {errors.userName && (
        <p className="text-sm text-red-600">{errors.userName.message}</p>
      )}
      <input
        placeholder={'Password'}
        type={'password'}
        id={'password'}
        {...register('password')}
      ></input>
      {errors.password && (
        <p className="text-sm text-red-600">{errors.password.message}</p>
      )}
      <input
        placeholder={'Confirm Password'}
        type={'password'}
        id={'confirmPassword'}
        {...register('confirmPassword')}
      ></input>
      {errors.confirmPassword && (
        <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
      )}
      <button type="submit" className="border-4 border-slate-800">
        Register
      </button>
    </form>
  );
}

export default SignUpForm;
