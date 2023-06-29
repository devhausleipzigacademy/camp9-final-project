import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignUpSchema,
  signUpSchema,
  SignUpResponse,
} from '@/types/user/AuthSchemata';

/////////////////////
// SignUp Mutation //
/////////////////////

async function signUpUser(user: SignUpSchema) {
  const { data } = await axios.post('/api/signup', user, {
    withCredentials: true,
  });
  return data;
}

export function useSignUpMutation() {
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

  const mutation = useMutation<SignUpResponse, AxiosError, SignUpSchema>({
    mutationFn: (user: SignUpSchema) => signUpUser(user),
    onSuccess: data => {
      toast.success('Welcome to the club!');
      reset();
    },
    onError: error => {
      toast.error('User already exists!');
    },
  });
  return { register, errors, handleSubmit, formState, ...mutation };
}
