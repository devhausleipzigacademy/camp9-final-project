'use client';

import InputField from '@/components/InputField';
import { useLoginMutation } from '@/components/hooks/useLogin';
import Button from '../buttons/Button';
import { LoginSchemaType } from '@/types/user/AuthSchemata';
import { redirect } from 'next/navigation';

function LoginForm() {
  // hook-form, toastify & tanstack-query are combined in custom hook useLoginMutation
  const { mutate, handleSubmit, isLoading, register, isSuccess,  errors, formState } =
    useLoginMutation();

  const onSubmit = (data: LoginSchemaType) => {
    mutate(data);
  };

  if (isSuccess === true) {
    redirect('/new')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-20"
    >
      <div className="flex flex-col gap-5">
        <InputField
          label="username"
          showLabel={true}
          width="full"
          type="username"
          key={'username'}
          error={errors.username}
          disabled={isLoading}
          {...register('username')}
        />
        <InputField
          label="password"
          showLabel={true}
          width="full"
          type="password"
          key={'password'}
          error={errors.password}
          disabled={isLoading}
          {...register('password')}
        />
      </div>

      <Button
        type="submit"
        size="full"
        variant="secondary"
        disabled={Object.keys(formState.errors).length !== 0}
      >
        Log in
      </Button>
    </form>
  );
}

export default LoginForm;
