import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { NewPoll, NewPollSchema } from 'types/newPoll/NewPollSchema';

async function signUpUser(poll: NewPoll) {
  const { data } = await axios.post('/api/new', poll, {
    withCredentials: true,
  });
  console.log(data);
  return data;
}

export function useNewPollMutation() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<NewPoll>({
    resolver: zodResolver(NewPollSchema),
  });
  const mutation = useMutation<NewPollResponse, AxiosError, NewPoll>({
    mutationFn: (poll: NewPoll) => signUpUser(poll),
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
