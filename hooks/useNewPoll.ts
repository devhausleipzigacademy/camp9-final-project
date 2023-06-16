import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { SignUpUser, signUpSchema } from '@/types/user/SignUpSchema';
import axios from 'axios';
import { NewPoll, newPollSchema } from 'types/newPoll/newPollSchema';

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
    resolver: zodResolver(newPollSchema),
  });
  const mutation = useMutation<NewPollResponse, AxiosError, NewPoll>({
    mutationFn: (poll: NewPoll) => signUpUser(poll),
    onSuccess: data => {
      toast.success('Welcome to the club!');
      reset();
    },
    onError: error => {
      toast.error('User already exists!');
    },
  });
  return { register, errors, handleSubmit, ...mutation };
}
