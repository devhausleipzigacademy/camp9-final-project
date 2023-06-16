import axios, { AxiosError } from 'axios';
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
  //signIn("Credentials")
  // const { data } = await axios.post('/api/auth', user, {
  //   withCredentials: true,
  // });
  console.log("HI", user);
  const res = await signIn('credentials', {password: user.password, username: user.userName, redirect: false})

  if (res?.error) {
    throw new Error(res.error);
  }
  return res;
}

export function useLoginMutation() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation<SignUpResponse, AxiosError, LoginSchemaType>({
    mutationFn: (user: LoginSchemaType) => loginUser(user),
    onSuccess: data => {
      toast.success('You have logged in successfully');
      //reset();
    },
    onError: error => {
      toast.error('Log in failed');
    },
  });
  return { register, errors, handleSubmit, ...mutation };
}
