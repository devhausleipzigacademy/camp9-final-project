'use client';

import { useSignUpMutation } from '@/components/hooks/useUser';
import { SignUpUser } from '@/types/user/SignUpSchema';

function SignUpForm() {
  const { mutate, isLoading, handleSubmit, register, errors } =
    useSignUpMutation();

  const onSubmit = (data: SignUpUser) => {
    mutate(data);
  };

  console.log(isLoading);

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
