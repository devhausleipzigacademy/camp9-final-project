import { Button } from '../stories/Button';

interface PollCardProps {
  title: string;
  description: string;
  backgroundColor?: string;
  onClick?: () => void;
}

export default function PollCard({
  title,
  description,
  backgroundColor,
  onClick,
}: PollCardProps) {
  return (
    <button className={`bg-${backgroundColor}`}>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <Button label="Vote" />
    </button>
  );
}
