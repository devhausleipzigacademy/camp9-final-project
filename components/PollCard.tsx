import { Button } from '../stories/Button';

interface PollCardProps {
  title: string;
}

export default function PollCard({ title }: PollCardProps) {
  return (
    <section
      className={`border-4 border-black rounded-md w-80 h-48 flex flex-col p-4 justify-between bg-yellow`}
    >
      <div
        className={`border-4 border-black rounded-md bg-white opacity-70 h-2/3 flex items-center justify-center`}
      >
        <h1 className="typography-body">{title}</h1>
      </div>
      <button
      
        className={`border-2 border-black rounded-md bg-yellow-100 ml-auto px-2 x`}
      >
        ✓
      </button>
    </section>
  );
}
