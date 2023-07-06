'use client';

import InputField from 'components/InputField';
import {
  SignUpResponse,
  SignUpSchema,
  signUpSchema,
} from '@/types/user/AuthSchemata';
import Button from '../buttons/Button';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function SignUpForm() {
  async function signUpUser(user: SignUpSchema) {
    const { data } = await axios.post('/api/signup', user, {
      withCredentials: true,
    });
    return data;
  }

  const router = useRouter();

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    formState,
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  const { mutate, isLoading } = useMutation<
    SignUpResponse,
    AxiosError,
    SignUpSchema
  >({
    mutationFn: (user: SignUpSchema) => signUpUser(user),
    onSuccess: data => {
      toast.success('Welcome to the club!');
      reset();
      router.push('/login');
    },
    onError: error => {
      if (error.response?.status === 422) {
        return toast.error('User already exists!');
      }
      toast.error('Sorry something went wrong!');
    },
  });

  return (
    <form
      onSubmit={handleSubmit(submitData => mutate(submitData))}
      noValidate
      className="flex flex-col gap-[52px]"
    >
      <div className="flex flex-col gap-5">
        <InputField
          label="username"
          disabled={isLoading}
          width="full"
          placeholder="username"
          type="text"
          error={errors.username}
          {...register('username')}
        />
        <InputField
          label="password"
          disabled={isLoading}
          error={errors.password}
          width="full"
          placeholder="password"
          type="password"
          {...register('password')}
        />
        <InputField
          label="confirm password"
          disabled={isLoading}
          error={errors.confirmPassword}
          width="full"
          placeholder="confirm password"
          type="password"
          {...register('confirmPassword')}
        />
      </div>
      <Button
        type="submit"
        size="full"
        variant="secondary"
        disabled={Object.keys(formState.errors).length !== 0 || isLoading}
      >
        Sign Up
      </Button>
    </form>
  );
}

export default SignUpForm;
