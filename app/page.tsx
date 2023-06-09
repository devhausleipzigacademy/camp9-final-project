import PollCard from 'components/PollCard';
import Link from 'next/link';
import { IoCheckmark } from 'react-icons/io5';

export default function Home() {
  return (
    <>
      <h1 className="title-black text-teal bg-yellow-light">Consensus App</h1>
      <div className=" m-10 w-40 h-40 bg-teal rounded border-brutal shadow-brutal "></div>
      <PollCard dateInput={new Date()} href={'/'}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Repellat quaerat vel
        facilis eius cupiditate sit id eligendi dolor, quas ab ut laboriosam
        rerum sed minima harum magnam eos nobis praesentium.
      </PollCard>
      <PollCard dateInput={new Date()} href={'/'}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </PollCard>
    </>
  );
}
