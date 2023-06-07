import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SignUpUser, signUpSchema } from '@/types/user/SignUpSchema';
import { useToast } from './useToast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// =====================================================================
// useSignupMutation type, query function and hook
// =====================================================================

async function signUpUser(user: SignUpUser) {
  const { data } = await axios.post('/api/signup', user, {
    withCredentials: true,
  });
  return data;
}

export function useSignUpMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpUser>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: SignUpUser) => signUpUser(data),
    onSuccess: data => {
      queryClient.invalidateQueries(['user']);
      reset();
      toast({
        title: 'Success',
        description: 'You have successfully signed up.',
        status: 'success',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: "We couldn't sign you up.",
        status: 'error',
      });
    },
  });
  return {
    ...mutation,
    register,
    handleSubmit,
    errors,
  };
}
