import { BsArrowUpRight } from 'react-icons/bs';

interface PollCardProps {
  question: string;
  open: boolean;
  voteButton: boolean;
  voted: boolean;
  days: number;
  hours: number;
  minutes: number;
}
const date = new Date();

export default function PollCard({
  question,
  open = true,
  voteButton = true,
  voted = false,
  days = open ? date.getDay() + 1 : date.getDay() - 1,
  hours = open ? date.getHours() : date.getHours(),
  minutes = open ? date.getMinutes() : date.getMinutes(),
}: PollCardProps) {
  const displayDays = days > 0 ? days : null;
  const displayHours = hours > 0 ? hours : null;
  const displayMinutes = minutes > 0 ? minutes : null;
  const pluralize = (value: number, unit: string) => {
    return value === 1 ? unit : `${unit}s`;
  };

  const closedDate = new Date();

  const closedDateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <section className="border-3 border-black rounded w-full h-48 flex flex-col p-4 justify-between bg-yellow shadow-brutalist">
      <div className="border-3 border-black rounded-md bg-white opacity-70 h-2/3 flex items-center justify-center">
        <h1 className="typography-body">{question}</h1>
      </div>
      <div className="flex justify-between">
        {open ? (
          <button className="typography-pre-title">
            {`Closes in ${
              displayDays
                ? `${displayDays} ${pluralize(displayDays, 'day')}`
                : ''
            } ${
              displayHours
                ? `${displayHours} ${pluralize(displayHours, 'hour')}`
                : ''
            } ${
              displayMinutes
                ? `${displayMinutes} ${pluralize(displayMinutes, 'minute')}`
                : ''
            }`}
          </button>
        ) : (
          <button className="typography-pre-title">{`Closed on ${closedDate.toLocaleDateString(
            undefined,
            closedDateOptions
          )}`}</button>
        )}
        {voteButton &&
          (voted !== null ? (
            voted ? (
              <button className="typography-body">Voted</button>
            ) : (
              <button className="typography-body flex items-center gap-1">
                Vote <BsArrowUpRight strokeWidth={'1'} />
              </button>
            )
          ) : null)}
      </div>
    </section>
  );
}
