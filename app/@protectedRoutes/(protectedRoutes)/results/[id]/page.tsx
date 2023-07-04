import PollResults from '@/components/PollResults';
import { db } from '@/libs/db';

async function getPoll(pollID: number) {
  const poll = await db.poll.findUniqueOrThrow({
    where: {
      id: pollID,
    },
    include: {
      participants: true,
      votes: true,
    },
  });
  return poll;
}

export default async function Results({ params }: { params: { id: string } }) {
  const poll = await getPoll(parseInt(params.id));
  return <PollResults  poll={poll}></PollResults>;
}
