import { PrismaClient } from '@prisma/client';
import PollCard from 'components/pollActivity/PollCard';
import Link from 'next/link';

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
  //this will be replaced with the session/logged in user once that has been esteblished
  //for now it is hardcoded to user 11
  const userId = '11';
  const newPolls = await getNewPolls(userId);

  if (newPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <img src="/images/flame-288.gif" className="w-[250px]"></img>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-full">
      <div className="overflow-y-auto h-[318px] w-[85%] scrollbar">
        {newPolls.map(poll => (
          <Link href={`/voting/${userId}/${poll.id}`}>
            <PollCard
              className="mb-4"
              key={poll?.id}
              endTime={poll.endDateTime}
              vote="vote"
              href="/new"
            >
              {poll?.question}
            </PollCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default New;
