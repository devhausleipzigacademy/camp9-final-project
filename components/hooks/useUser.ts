import axios, { AxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SignUpUser } from '@/types/user/SignUpSchema';

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
  //The query client manages the caching and fetching of data queries within your application.
  const queryClient = useQueryClient();

  //handle the different states and side effects associated with mutations,
  //such as loading, success, and error states.
  const mutation = useMutation<SignUpResponse, AxiosError, SignUpUser>({
    mutationFn: (user: SignUpUser) => signUpUser(user),

    //onSuccess: is a function that will fire if the mutation is successful.
    //invalidateQueries: the cached data for that query will be marked as stale,and the next time the query is requested, it will trigger a fresh fetch to update the data.
    //[register] is the query key, this is how react-query identifies the query and binded data
    onSuccess: data => queryClient.invalidateQueries(['register']),
  });
  return mutation;
}
