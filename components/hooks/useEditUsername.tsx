import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SignUpResponse,
  UsernameType,
  usernameSchema,
} from '@/types/user/AuthSchemata';

///////////////////////////
// editUsername Mutation //
///////////////////////////

export function useEditUsernameMutation() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    formState,
  } = useForm<UsernameType>({
    resolver: zodResolver(usernameSchema),
    mode: 'onTouched',
  });

  const mutation = useMutation<SignUpResponse, AxiosError, UsernameType>({
    mutationFn: async (newUsernameAndID: Object) => { // <-- FIX: this type should be more specific
      const { data } = await axios.post(
        '/api/updateUsername',
        newUsernameAndID,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: data => {
      reset({}); // <-- FIX: doesn't actually reset field
      toast.success('Username successfully updated');
    },
    onError: error => {
      toast.error('Username update failed');
    },
  });

  return { register, errors, handleSubmit, formState, ...mutation };
}