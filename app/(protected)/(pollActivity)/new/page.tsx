import { PrismaClient } from '@prisma/client';
import PollCard from 'components/pollActivity/PollCard';

const prisma = new PrismaClient();

async function getNewPolls(userId: string) {
  const filteredNewPolls = await prisma.poll.findMany({
    where: {
      participants: {
        some: {
          id: parseInt(userId),
        },
      },
      votes: {
        none: {
          userId: parseInt(userId),
        },
      },
    },
  });
  return filteredNewPolls;
}

async function New() {
  const newPolls = await getNewPolls('11');

  return (
    <div className="flex justify-center h-full">
      <div className="overflow-y-auto h-[318px] w-[85%] scrollbar">
        {newPolls.map(poll => (
          <PollCard
            className="mb-4"
            key={poll?.id}
            endTime={poll.endDateTime}
            vote="vote"
            href="/new"
          >
            {poll?.question}
          </PollCard>
        ))}
      </div>
    </div>
  );
}
export default New;
