'use client';

import { Poll } from '@prisma/client';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { PollRequest } from 'app/home/page';
import axios from 'axios';
import { useFilterPollActivity } from './hooks/usePolls';
import { use, useState } from 'react';

async function getPolls(pollRequest: PollRequest) {
  const { data } = await axios.get('/api/pollactivity', {
    params: pollRequest,
  });
  return data;
}

function ListFilterComponent() {
  const { setUseFilter } = useFilterPollActivity();

  function handleButtonFilter(filter: string) {
    setUseFilter(filter);
  }
  return (
    <div>
      <button onClick={() => handleButtonFilter('new')}>new</button>
      <button onClick={() => handleButtonFilter('pending')}>pending</button>
      <button onClick={() => handleButtonFilter('closed')}>closed</button>
      <button onClick={() => handleButtonFilter('myPolls')}>my polls</button>
    </div>
  );
}

export default ListFilterComponent;
