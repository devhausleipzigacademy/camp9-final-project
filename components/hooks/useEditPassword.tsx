import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SettingsPasswordType,
  SignUpResponse,
  settingsPasswordSchema,
} from '@/types/user/AuthSchemata';

//////////////////////////////
// useEditPassword Mutation //
//////////////////////////////

export function useEditPasswordMutation() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    formState,
  } = useForm<SettingsPasswordType>({
    resolver: zodResolver(settingsPasswordSchema),
    mode: 'onSubmit',
  });

  const mutation = useMutation<
    SignUpResponse,
    AxiosError,
    SettingsPasswordType
  >({
    mutationFn: async (newPasswordAndID: Object) => {
      // /\ FIX: this type should be more specific
      const { data } = await axios.post(
        '/api/updatePassword',
        newPasswordAndID,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    onSuccess: data => {
      reset({}); // <-- FIX: doesn't actually reset field
      toast.success('Password successfully updated');
    },
    onError: error => {
      toast.error('Password update failed');
    },
  });

  return { register, errors, handleSubmit, formState, ...mutation };
}
