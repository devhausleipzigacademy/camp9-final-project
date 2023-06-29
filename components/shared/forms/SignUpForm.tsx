'use client';

import InputField from 'components/InputField';
import { useSignUpMutation } from 'components/hooks/useUser';
import { SignUpSchema } from '@/types/user/AuthSchemata';
import Button from '../buttons/Button';
import { redirect } from 'next/navigation';

function SignUpForm() {
  const { mutate, isLoading, handleSubmit, register, errors, isSuccess, formState } =
    useSignUpMutation();

  const onSubmit = (data: SignUpSchema) => {
    mutate(data);
  };

  if (isSuccess === true) {
    redirect('/login')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-20"
    >
      <div className="flex flex-col gap-5">
        <InputField
          label={'Username'}
          showLabel={true}
          disabled={isLoading}
          width="full"
          key={'userName'}
          placeholder={'Username'}
          type="text"
          error={errors.username}
          {...register('username')}
        />
        <InputField
          label={'Password'}
          showLabel={true}
          disabled={isLoading}
          error={errors.password}
          width="full"
          key={'password'}
          placeholder={'Password'}
          type={'password'}
          {...register('password')}
        />
        <InputField
          label={'Confirm Password'}
          showLabel={true}
          disabled={isLoading}
          error={errors.confirmPassword}
          width="full"
          key={'confirmPassword'}
          placeholder={'Confirm Password'}
          type={'password'}
          {...register('confirmPassword')}
        />
      </div>
      <Button
        type="submit"
        size="full"
        variant="secondary"
        disabled={Object.keys(formState.errors).length !== 0}
      >
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;