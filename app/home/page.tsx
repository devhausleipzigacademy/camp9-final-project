import React from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import ListFilterComponent from 'components/ListFilterComponent';
import { PrismaClient } from '@prisma/client';

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

  return (
    <div>
      <ListFilterComponent />
      {/* {newPolls.map((poll) => ())} */}
    </div>
  );
}

export default Home;
