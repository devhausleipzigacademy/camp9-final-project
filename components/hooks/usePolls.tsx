import { Poll } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PollRequest } from 'app/home/page';
import axios from 'axios';
import { useState } from 'react';

async function getPolls(pollRequest: PollRequest) {
  const { data } = await axios.get('/api/pollactivity', {
    params: pollRequest,
  });
  return data;
}

export function useFilterPollActivity() {
  const [filter, useFilter] = useState('new');
  const userId = '1';
  const queryClient = useQueryClient();
  const query = useQuery<Poll[], Error>({
    queryKey: [filter],
    queryFn: () => getPolls({ userId, filter }),
  });

  return { query, queryClient, useFilter };
}
