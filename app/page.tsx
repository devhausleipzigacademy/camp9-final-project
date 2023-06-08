import PollCard from 'components/PollCard';
import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';

export default function Home() {
  return (
    <>
      <h1 className="title-black text-teal bg-yellow-light">Consensus App</h1>
      <div className=" m-10 w-40 h-40 bg-teal rounded border-brutal shadow-brutal "></div>
      <PollCard dateInput={new Date('2023-06-15T00:00:00')}>Julian</PollCard>
      <PollCard
        icon={
          <Link href={"/"}>
            Vote
            <IoCheckmark />
          </Link>
        }
        dateInput={new Date('2023-06-15T00:00:00')}
      >
        Julian
      </PollCard>
      <PollCard
        icon={<h3>Vote</h3>}
        dateInput={new Date('2023-06-15T00:00:00')}
      >
        Julian
      </PollCard>
      <PollCard
        icon={<h3>Vote</h3>}
        dateInput={new Date('2023-06-15T00:00:00')}
      >
        Julian
      </PollCard>
    </>
  );
}
