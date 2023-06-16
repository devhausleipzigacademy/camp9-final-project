'use client';

import InputField from '@/components/InputField';
import { useLoginMutation } from '@/components/hooks/useLogin';
import { LoginSchemaType } from '@/types/user/LoginSchema';

function LoginForm() {
  const { mutate, handleSubmit, register, errors } =
    useLoginMutation();

  const onSubmit = (data: LoginSchemaType) => {
    console.log("data from loginform:", data);
    mutate(data);
  };

  const onSubmitError = (data: any) => {
    console.log("error, data is:", data)
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
        error={errors.userName}
        disabled={false}
        {...register('userName')}
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
