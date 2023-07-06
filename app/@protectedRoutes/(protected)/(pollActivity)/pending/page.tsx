import PollActivityCards from '@/components/pollActivity/PollActivityCards';
import { authOptions } from '@/libs/auth';
import { getPendingPolls } from '@/services/getPolls';
import { getServerSession } from 'next-auth';
import React from 'react';

async function Pending() {
  const session = await getServerSession(authOptions);
  const polls = await getPendingPolls();
  return (
    <PollActivityCards
      polls={polls}
      userId={session?.user.id!}
      type="pending"
    />
  );
}

export default Pending;
