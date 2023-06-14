import ListFilterComponent from 'components/ListFilterComponent';
import { PrismaClient } from '@prisma/client';
import { useFilterPollActivity } from 'components/hooks/usePolls';
import { useState } from 'react';

export type PollRequest = {
  userId: string;
  filter: string;
};
const prisma = new PrismaClient();

async function getPolls(pollRequest: PollRequest) {
  const filteredNewPolls = await prisma.poll.findMany({
    where: {
      participants: {
        some: {
          id: +pollRequest.userId,
        },
      },
      votes: {
        none: {
          userId: +pollRequest.userId,
        },
      },
    },
  });
  return filteredNewPolls;
}

async function Home() {
  //const { data: session, status } = useSession();
  const newPolls = await getPolls({ userId: '11', filter: 'new' });
  // const { query } = useFilterPollActivity();

  // if (query.isLoading) return <div>Loading...</div>;
  // if (query.isError) return <div>{query.isError}</div>;

  return (
    <div>
      <ListFilterComponent />
      {newPolls.map(poll => (
        <p>{poll.description}</p>
      ))}
    </div>
  );
}

export default Home;
