import React from 'react';
import PollActivityCards from '@/components/pollActivity/PollActivityCards';
import { getMyPolls } from '@/services/getPolls';

async function MyPolls() {
  const polls = await getMyPolls();
  return <PollActivityCards polls={polls} type="myPolls" />;
}

export default MyPolls;
