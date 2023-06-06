import PollCard from '@/components/PollCard';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex items-center flex-col gap-4">
      <h1 className="text-3xl text-center text-yellow-900">Consensus App </h1>
      <PollCard title="Question" />
    </div>
  );
}
