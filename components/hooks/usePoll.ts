import { Poll } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';


//axios get request to get the data from the database
function getPollData(userID: string, pollID: string) {
  const votePoll = axios.get<Poll>('/api/voting/', {
    params: { userId: userID, pollId: pollID },
  });
  return votePoll;
}

//useQuery to call the axios get request
export function useVotePollQuery(userId: string, pollId: string) {
  const query = useQuery({
    queryKey: ['votePoll', userId],
    queryFn: () => getPollData(userId, pollId),
  });
  return { query };
}

type VoteResponse = {
  message: string;
};

type myVote = {
  id: number;
  answer: boolean[];
  pollId: number;
  userId: number;
};




