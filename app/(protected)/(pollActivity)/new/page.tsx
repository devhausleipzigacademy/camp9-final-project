import { PrismaClient } from '@prisma/client';
import PollCard from 'components/PollCard';

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
  const newPolls = await getNewPolls('11');

  if (newPolls.length === 0) {
    return (
      <div className=" flex flex-col justify-center items-center">
        <img src="/images/flame-288.gif" className="w-[250px]"></img>
        <h1 className="title-bold text-center">No polls to see.</h1>
      </div>
    );
  }

  return newPolls.map(poll => (
    <PollCard
      className="mb-4"
      key={poll.id}
      endDate={poll.endDateTime}
      isVoted={false}
      isOwner={false}
      pollId={poll.id}
    >
      {poll?.question}
    </PollCard>
  ));
}
export default New;
