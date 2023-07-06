import React from 'react';
import { getClosedPolls } from '@/services/getPolls';
import PollActivityCards from '@/components/pollActivity/PollActivityCards';

async function Closed() {
  const polls = await getClosedPolls();
  return <PollActivityCards polls={polls} type="closed" />;
}

export default Closed;
