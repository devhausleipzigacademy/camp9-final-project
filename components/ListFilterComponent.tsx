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

async function getPolls(pollRequest: PollRequest) {
  const { data } = await axios.get('/api/pollactivity', {
    params: pollRequest,
  });
  return data;
}

function ListFilterComponent() {
  const { useFilter } = useFilterPollActivity();

  return (
    <div>
      <button onClick={() => useFilter('new')}>new</button>
      <button onClick={() => useFilter('pending')}>pending</button>
      <button onClick={() => useFilter('closed')}>closed</button>
      <button onClick={() => useFilter('myPolls')}>my polls</button>
    </div>
  );
}

export default ListFilterComponent;
