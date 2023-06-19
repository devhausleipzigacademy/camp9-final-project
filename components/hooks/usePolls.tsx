'use client';

import { Poll } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PollRequest } from 'app/(pollActivity)/page';
import axios from 'axios';
import { useState } from 'react';

async function getPolls(pollRequest: PollRequest) {
  const { data } = await axios.get<Poll[]>('/api/pollactivity', {
    params: pollRequest,
  });
  return data;
}

export function useFilterPollActivity(filter: string) {
  const userId = '11';
  const query = useQuery<Poll[], Error>({
    queryKey: ['poll', filter],
    queryFn: () => getPolls({ userId, filter }),
  });

  return { query };
}