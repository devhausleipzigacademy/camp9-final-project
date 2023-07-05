import PollCard from 'components/PollCard';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth/next';
import { db } from '@/libs/db';

async function getNewPolls() {
  const session = await getServerSession(authOptions);
  let todayInAMinute = new Date();
  todayInAMinute.setMinutes(todayInAMinute.getMinutes() + 1);

  const filteredNewPolls = await db.poll.findMany({
    where: {
      participants: {
        some: {
          id: session?.user.id,
        },
      },
      votes: {
        none: {
          userId: session?.user.id,
        },
      },
      endDateTime: {
        gt: todayInAMinute,
      },
    },
    orderBy: {
      endDateTime: 'asc',
    },
  });

  return filteredNewPolls;
}

async function NewPolls() {
  const newPolls = await getNewPolls();
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
      pollId={poll.id}
    >
      {poll?.question}
    </PollCard>
  ));
}
export default NewPolls;
