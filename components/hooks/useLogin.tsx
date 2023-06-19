import { loginSchema, LoginSchemaType } from '@/types/user/LoginSchema';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

////////////////////
// Login Mutation //
////////////////////

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

export function useLoginMutation() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    formState,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const mutation = useMutation({
    mutationFn: (user: LoginSchemaType) => loginUser(user),
    onSuccess: () => {
      toast.success('You have logged in successfully');
    },
    onError: () => {
      toast.error(
        'Log in failed: account not found. Username or password incorrectly typed?'
      );
    },
  });
  return { register, errors, handleSubmit, formState, ...mutation };
}
