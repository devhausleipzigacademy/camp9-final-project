import { Anonymity, Mood, Poll } from '@prisma/client';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { authOptions } from '@/libs/auth';

import { getServerSession } from 'next-auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// const session = await getServerSession(authOptions);

//axios get request to get the data from the database
function getPollData(pollID: string) {
  const votePoll = axios.get<Poll>('/api/vote/', {
    params: { pollId: pollID },
  });
  return votePoll;
}

//useQuery to call the axios get request
export function useVotePollQuery(pollId: string) {
  const query = useQuery({
    queryKey: ['votePoll', pollId],
    queryFn: () => getPollData(pollId),
  });
  return { query };
}

export type VoteAnswer = {
  pollId: number;
  answer: boolean[];
  mood: Mood;
};

///useMutation to call the axios post request
function sendVote(requestvote: VoteAnswer) {
  const sendVoteRequest = axios.post('/api/vote/', requestvote);
  return sendVoteRequest;
}

export function useVotePollMutation(pollId: string) {
  const router = useRouter();
  const query = new QueryClient();
  const mutation = useMutation({
    mutationKey: ['votePoll', pollId],
    mutationFn: (requestVote: VoteAnswer) => sendVote(requestVote),
    onSuccess: data => {
      query.invalidateQueries(['votePoll', pollId]);
      router.refresh();
      router.back();
    },
    onError: () => {
      toast.error('you have already voted');
    },
  });
  return { ...mutation };
}
