'use client';

import { useSignUpMutation } from '@/components/hooks/useUser';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpUser, signUpSchema } from '@/types/user/SignUpSchema';

type SignUpForm = React.FormHTMLAttributes<HTMLFormElement>;

function SignUpForm() {
  const { mutate, isLoading, isError } = useSignUpMutation();

  //useForm: a function to register form inputs with the form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpUser>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpUser) => {
    mutate(data);
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
