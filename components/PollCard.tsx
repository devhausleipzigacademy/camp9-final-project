import { BsArrowUpRight } from 'react-icons/bs';
interface PollCardProps {
  question: string;
  open: boolean;
  voted: boolean;
  minutes: number;
  hours: number;
}

const date = new Date();
// date in the future
date.setHours(date.getHours() + 2);
date.setMinutes(date.getMinutes() + 35);

const countdownHours = date.getHours();
const countdownMinutes = date.getMinutes();

//
date.setHours(date.getHours() - 2);
date.setMinutes(date.getMinutes() - 35);

const countdownHoursPast = date.getHours();
const countdownMinutesPast = date.getMinutes();

export default function PollCard({
  question: title,
  open = true,
  voted = false,
  minutes = open ? countdownMinutes : countdownMinutesPast,
  hours = open ? countdownHours : countdownHoursPast,
}: PollCardProps) {
  const displayHours = hours > 0 ? hours : null;
  const displayMinutes = minutes > 0 ? minutes : null;
  const pluralize = (value: number, unit: string) => {
    return value === 1 ? unit : `${unit}s`;
  };

  return (
    <section
      className={`border-3 border-black rounded w-full h-48 flex flex-col p-4 justify-between bg-yellow shadow-brutalist`}
    >
      <div
        className={`border-3 border-black rounded-md bg-white opacity-70 h-2/3 flex items-center justify-center`}
      >
        <h1 className="typography-body">{title}</h1>
      </div>
      <div className="flex justify-between">
        {open ? (
          <button className="typography-small">
            {`Closes in ${
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
          <button className="typography-small">{`Closed since ${
            displayHours
              ? `${displayHours} ${pluralize(displayHours, 'hour')}`
              : ''
          } ${
            displayMinutes
              ? `${displayMinutes} ${pluralize(displayMinutes, 'minute')}`
              : ''
          }`}</button>
        )}
        {voted ? (
          <button className="typography-body">Voted</button>
        ) : (
          <button className="typography-body flex items-center gap-1">
            Vote
            <BsArrowUpRight strokeWidth={'1'} />
          </button>
        )}
      </div>
    </section>
  );
}
