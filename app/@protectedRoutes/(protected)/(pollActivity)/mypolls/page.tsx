import React from 'react';
import PollActivityCards from '@/components/pollActivity/PollActivityCards';
import { getMyPolls } from '@/services/getPolls';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';

async function MyPolls() {
  const session = await getServerSession(authOptions);
  const polls = await getMyPolls();
  return (
    <PollActivityCards
      polls={polls}
      userId={session?.user.id!}
      type="myPolls"
    />
  );
}

export default MyPolls;
