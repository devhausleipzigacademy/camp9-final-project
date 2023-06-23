import { PrismaClient } from '@prisma/client';
import PollCard from 'components/pollActivity/PollCard';
import Image from 'next/image';

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

  const checkDatePolls = filteredNewPolls.filter(poll => {
    if (poll.endDateTime < new Date()) {
      return false;
    }
    return true;
  });
  return checkDatePolls;
}

async function New() {
  //this will be replaced with the session/logged in user once that has been esteblished
  //for now it is hardcoded to user 11
  const userId = '11';
  const newPolls = await getNewPolls(userId);

  if (newPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <Image
          src="/images/flame-288.gif"
          alt="newpolls"
          width={250}
          height={250}
        ></Image>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-full">
      <div className="overflow-y-auto h-[318px] w-[85%] scrollbar">
        {newPolls.map(poll => (
          <PollCard
            className="mb-4"
            key={poll?.id}
            endTime={poll.endDateTime}
            vote="vote"
            href={`/voting/${userId}/${poll.id}`}
          >
            {poll?.question}
          </PollCard>
        ))}
      </div>
    </div>
  );
}
export default New;
