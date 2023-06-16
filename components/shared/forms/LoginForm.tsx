'use client';

import InputField from '@/components/InputField';
import { useLoginMutation } from '@/components/hooks/useLogin';
import { LoginSchemaType } from '@/types/user/LoginSchema';

function LoginForm() {
  // hook-form, toastify & tanstack-query are combined in custom hook useLoginMutation
  const { mutate, handleSubmit, register, errors } =
    useLoginMutation();

  const onSubmit = (data: LoginSchemaType) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <InputField
        label="username"
        width="full"
        type="username"
        error={errors.username}
        disabled={false}
        {...register('username')}
      />
      <InputField
        label="password"
        width="full"
        type="password"
        error={errors.password}
        disabled={false}
        {...register('password')}
      />

      <button type="submit" className="border-4 border-slate-800">
        Log in
      </button>
    </form>
  );
}

export default LoginForm;
