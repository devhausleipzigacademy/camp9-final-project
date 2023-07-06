import React from 'react';
import { getClosedPolls } from '@/services/getPolls';
import PollActivityCards from '@/components/pollActivity/PollActivityCards';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';

async function Closed() {
  const session = await getServerSession(authOptions);
  const polls = await getClosedPolls();
  return (
    <PollActivityCards polls={polls} userId={session?.user.id!} type="closed" />
  );
}

export default Closed;
