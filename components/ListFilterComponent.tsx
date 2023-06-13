'use client';

import { Poll } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PollRequest } from 'app/home/page';
import axios from 'axios';


async function getPolls(pollRequest: PollRequest) {
  const { data } = await axios.get('/api/pollactivity', {
    params: pollRequest,
  });
  return data;
}

function ListFilterComponent() {
  const { data: polls, isLoading } = useQuery<Poll[], Error>({
    queryKey: ['polls'],
    queryFn: () => getPolls({ userId: 'Hello', filter: 'new' }),
  });
  //tanStack + axios request
  function handleFilter(filterOption: string) {
    const userId = 'Hello'; //session?.user?.name as string;
    const pollRequest = { userId, filter: filterOption };
    getPolls(pollRequest);
  }

  const mutation = useMutation({})

  return (
    <div>
      <button onClick={() => handleFilter('new')}>new</button>
      <button onClick={() => handleFilter('pending')}>pending</button>
      <button onClick={() => handleFilter('closed')}>closed</button>
      <button onClick={() => handleFilter('myPolls')}>my polls</button>
    </div>
  );
}

export default ListFilterComponent;
