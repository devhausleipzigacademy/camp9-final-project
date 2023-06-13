import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import ListFilterComponent from 'components/ListFilterComponent';
import { PrismaClient } from '@prisma/client';
import { useFilterPollActivity } from 'components/hooks/usePolls';

export type PollRequest = {
  userId: string;
  filter: string;
};
const prisma = new PrismaClient();

// async function getPolls(pollRequest: PollRequest) {
//   const filteredNewPolls = await prisma.poll.findMany({
//     where: {
//       participants: {
//         some: {
//           id: +pollRequest.userId,
//         },
//       },
//       votes: {
//         none: {
//           userId: +pollRequest.userId,
//         },
//       },
//     },
//   });
//   return filteredNewPolls;
// }

async function Home() {
  //const { data: session, status } = useSession();
  //const newPolls = await getPolls({ userId: 'Hello', filter: 'new' });
  const { query } = useFilterPollActivity();
  return (
    <div>
      <ListFilterComponent />
    </div>
  );
}

export default Home;
