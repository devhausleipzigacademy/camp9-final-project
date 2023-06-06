import PollCard from '@/components/PollCard';

export default function Home() {
  return (
    <body className="px-8 flex items-center flex-col ">
      <h1 className="text-3xl text-center text-yellow-900">Consensus App </h1>
      <PollCard title="Question" />
    </body>
  );
}
