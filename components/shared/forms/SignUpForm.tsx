'use client';

import InputField from 'components/InputField';
import { useSignUpMutation } from 'components/hooks/useUser';
import { use, useRef } from 'react';
import { SignUpUser } from 'types/user/SignUpSchema';

function SignUpForm() {
  const { mutate, isLoading, handleSubmit, register, errors } =
    useSignUpMutation();

  const onSubmit = (data: SignUpUser) => {
    mutate(data);
  };

  const { ref: userNameRef } = register('userName');
  const { ref: passwordRef } = register('password');
  const { ref: confirmPasswordRef } = register('confirmPassword');

  console.log(isLoading);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <InputField
        label={'Username'}
        disabled={isLoading}
        width="full"
        key={'userName'}
        placeholder={'Username'}
        type="text"
        error={errors.userName}
        {...register('userName')}
      ></InputField>
      <InputField
        label={'Password'}
        disabled={isLoading}
        width="full"
        key={'password'}
        placeholder={'Password'}
        type={'password'}
        ref={passwordRef}
      ></InputField>
      <InputField
        label={'Confirm Password'}
        disabled={isLoading}
        width="full"
        key={'confirmPassword'}
        placeholder={'Confirm Password'}
        type={'password'}
        ref={confirmPasswordRef}
      ></InputField>
      <button type="submit" className="border-4 border-slate-800">
        Register
      </button>
    </form>
  );
}

export default SignUpForm;
