import PollActivityCards from '@/components/pollActivity/PollActivityCards';
import { getPendingPolls } from '@/services/getPolls';
import React from 'react';

async function Pending() {
  const polls = await getPendingPolls();
  return <PollActivityCards polls={polls} type="pending" />;
}

export default Pending;
