'use client';

import InputField from '@/components/InputField';
import { useLoginMutation } from '@/components/hooks/useLogin';
import Button from '../buttons/Button';
import { LoginSchemaType, loginSchema } from '@/types/user/AuthSchemata';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    formState,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });
  const router = useRouter();

  const { mutate, isLoading } = useMutation({
    mutationFn: (user: LoginSchemaType) => loginUser(user),
    onSuccess: () => {
      toast.success('You have logged in successfully');
      router.push('/');
      router.refresh();
    },
    onError: () => {
      toast.error(
        'Log in failed: account not found. Username or password incorrectly typed?'
      );
    },
  });

  async function loginUser(user: LoginSchemaType) {
    const res = await signIn('credentials', {
      ...user,
      redirect: false,
    });

    if (res?.error) {
      throw new Error(res.error);
    }
    return res;
  }

  return (
    <form
      onSubmit={handleSubmit(submitData => mutate(submitData))}
      noValidate
      className="flex flex-col gap-36"
    >
      <div className="flex flex-col gap-5">
        <InputField
          label="username"
          width="full"
          type="username"
          error={errors.username}
          placeholder="username"
          disabled={isLoading}
          {...register('username')}
        />
        <InputField
          label="password"
          width="full"
          type="password"
          placeholder="password"
          error={errors.password}
          disabled={isLoading}
          {...register('password')}
        />
      </div>

      <Button
        type="submit"
        size="full"
        variant="secondary"
        disabled={Object.keys(formState.errors).length !== 0 || isLoading}
      >
        Log in
      </Button>
    </form>
  );
}

export default LoginForm;
