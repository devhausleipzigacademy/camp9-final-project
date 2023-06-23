import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import {
  CreateNewPoll,
  CreateNewPollSchema,
} from '@/types/newPoll/CreatePollSchema';

async function createNewPoll(poll: CreateNewPoll) {
  const { data } = await axios.post('/api/new', poll, {
    withCredentials: true,
  });
  return data;
}

export function useNewPollMutation() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<CreateNewPoll>({
    resolver: zodResolver(CreateNewPollSchema),
  });
  const mutation = useMutation<NewPollResponse, AxiosError, CreateNewPoll>({
    mutationFn: (poll: CreateNewPoll) => createNewPoll(poll),
    onSuccess: data => {
      toast.success('Poll created!');
      reset();
    },
    onError: error => {
      toast.error('Something went wrong!');
    },
  });
  return { register, errors, handleSubmit, ...mutation };
}
