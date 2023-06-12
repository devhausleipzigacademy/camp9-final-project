'use client';

import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export type PollRequest = {
  userId: string;
  filter: string;
};

async function getPolls(pollRequest: PollRequest) {
  const { data } = await axios.post('/api/pollactivity', pollRequest);
  console.log(data);
  return data;
}

function Home() {
  //const { data: session, status } = useSession();

  function handleFilter(filterOption: string) {
    const userId = 'Hello'; //session?.user?.name as string;
    const pollRequest = { userId, filter: filterOption };
    getPolls(pollRequest);
  }

  return (
    <div>
      <div>
        <button onClick={() => handleFilter('new')}>new</button>
        <button onClick={() => handleFilter('pending')}>pending</button>
        <button onClick={() => handleFilter('closed')}>closed</button>
        <button onClick={() => handleFilter('myPolls')}>my polls</button>
      </div>
      <div></div>
    </div>
  );
}

export default Home;
