import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Link from 'next/link';

interface PollCardProps extends React.HTMLAttributes<HTMLElement> {
  children: string;
  endDate: Date;
  isVoted?: boolean;
  pollId: number;
}

export default function PollCard({
  children,
  endDate,
  isVoted,
  pollId,
  ...props
}: PollCardProps) {
  const currentDate = new Date(); // Get the current date

  const date = new Date(endDate); // Get the end date of the poll

  const isOpen = date.getTime() > Date.now(); // if the date is in the past, the poll is closed

  const timeDifference = date.getTime() - currentDate.getTime(); // Calculate the time difference in milliseconds

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate the difference in days

  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24); // Calculate the difference in hours

  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60); // Calculate the difference in minutes

  const displayDays = days > 0 ? days : null; // Check if the number of days is greater than 0
  const displayHours = hours > 0 ? hours : null; // Check if the number of hours is greater than 0
  const displayMinutes = days === 0 && minutes > 0 ? minutes : null; // Check if the number of minutes is greater than 0

  const pluralize = (value: number, unit: string) => {
    return value === 1 ? unit : `${unit}s`; // Add plural "s" to the unit if the value is not 1
  };

  const state = () => {
    let text = '';

    if (isOpen) {
      if (!isVoted) {
        text = 'Vote';
      } else {
        text = 'See Details';
      }
    } else {
      text = 'See Results';
    }

    const icon = <HiOutlineArrowNarrowRight size={25} strokeWidth={2} />;

    return (
      <>
        <h3>{text}</h3>
        {icon}
      </>
    );
  };
  let href;
  if (isOpen && isVoted) {
    href = `/details/${pollId}/1`;
  } else if (isOpen && !isVoted) {
    href = `/vote/${pollId}`;
  } else {
    href = `/results/${pollId}`;
  }

  return (
    <Link
      className="cursor-pointer border-3 border-black rounded w-full flex flex-col pt-3 px-3 pb-1  bg-yellow gap-1 shadow-brutal "
      href={href!}
    >
      <div className="px-2 py-1 border-3 h-[66px] border-black rounded-md bg-yellow-light flex">
        <h4 className="body line-clamp-2">{children}</h4>
      </div>
      <div className="flex justify-between items-center h-5 gap-1">
        {isOpen ? (
          <p className="small">
            Closes in{' '}
            {
              <span className="small-bold">
                {
                  displayDays &&
                    `${displayDays} ${pluralize(displayDays, 'day')}` // Display the number of days
                }
                {displayDays && displayHours && ', '}
                {
                  displayHours &&
                    `${displayHours} ${pluralize(displayHours, 'hour')}` // Display the number of hours
                }
                {displayHours && displayMinutes && ', '}
                {
                  displayMinutes &&
                    `${displayMinutes} ${pluralize(displayMinutes, 'minute')}` // Display the number of minutes
                }
              </span>
            }
          </p>
        ) : (
          <p className="small">
            Closed on{' '}
            {
              <span className="small-bold">
                {date.toLocaleDateString('en-GB')}
              </span>
            }
          </p> // Display the closed date
        )}
        {
          <button className="description flex items-center gap-1">
            {state()}
          </button>
        }
      </div>
    </Link>
  );
}
