'use client';

import InputField from '@/components/InputField';
import { useSignUpMutation } from '@/components/hooks/useUser';
import { SignUpUser } from '@/types/user/SignUpSchema';

function SignUpForm() {
  const { mutate, isLoading, handleSubmit, register, errors } =
    useSignUpMutation();

  const onSubmit = (data: SignUpUser) => {
    mutate(data);
  };

  const onSubmitError = (data: any) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onSubmitError)}
      noValidate
      className="flex flex-col gap-5"
    >
      <InputField
        label="username"
        width="full"
        type="username"
        error={errors.userName}
        {...register('userName')}
      />
      <InputField
        label="password"
        width="full"
        type="password"
        error={errors.password}
        {...register('password')}
      />

      <InputField
        label="confirm password"
        type="password"
        width="full"
        error={errors.confirmPassword}
        {...register('confirmPassword')}
      />

      <button type="submit" className="border-4 border-slate-800">
        Register
      </button>
    </form>
  );
}

export default SignUpForm;
