'use client';

import { useRouter } from 'next/navigation';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

interface PollCardProps {
  children: string;
  endDate: Date;
  isOwner: boolean;
  isVoted?: boolean;
}

export default function PollCard({
  children,
  endDate,
  isOwner = false,
  isVoted,
}: PollCardProps) {
  const router = useRouter();
  const currentDate = new Date(); // Get the current date

  const date = new Date(endDate); // Get the end date of the poll

  const isOpen = date.getTime() > Date.now(); // if the date is in the past, the poll is closed

  const timeDifference = date.getTime() - currentDate.getTime(); // Calculate the time difference in milliseconds

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate the difference in days

  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24); // Calculate the difference in hours

  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60); // Calculate the difference in minutes

  const displayDays = days > 0 ? days : null; // Check if the number of days is greater than 0
  const displayHours = hours > 0 ? hours : null; // Check if the number of hours is greater than 0
  const displayMinutes = minutes > 0 ? minutes : null; // Check if the number of minutes is greater than 0

  const pluralize = (value: number, unit: string) => {
    return value === 1 ? unit : `${unit}s`; // Add plural "s" to the unit if the value is not 1
  };

  const state = () => {
    let text = '';

    if (isOpen) {
      if (!isVoted && !isOwner) {
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

  function handleClick() {
    if (isOwner) {
      router.push('/details');
    } else if (isOpen && isVoted) {
      router.push('/details');
    } else if (isOpen && !isVoted) {
      router.push('/voting');
    } else if (!isOpen) {
      router.push('/results');
    }
  }

  return (
    <div
      className="cursor-pointer border-3 border-black rounded w-full flex flex-col pt-3 px-3 pb-1  bg-yellow gap-1 shadow-brutal"
      onClick={handleClick}
    >
      <div className="px-2 flex items-center justify-center border-3 h-[66px] border-black rounded-md bg-yellow-light ">
        <h1 className="body line-clamp-2">{children}</h1>
      </div>
      <div className="flex justify-between items-center h-5 gap-1">
        {isOpen ? (
          <p className="small">
            Closes in
            {
              <span className="small-bold before:content-['_']">
                {`${
                  displayDays &&
                  `${displayDays} ${pluralize(displayDays, 'day')},` // Display the number of days
                } ${
                  displayHours &&
                  `${displayHours} ${pluralize(displayHours, 'hour')},` // Display the number of hours
                } ${
                  displayMinutes &&
                  `${displayMinutes} ${pluralize(displayMinutes, 'minute')}` // Display the number of minutes
                }`}
              </span>
            }
          </p>
        ) : (
          <p className="small">
            Closed on{' '}
            {<span className="small-bold">{date.toLocaleDateString()}</span>}
          </p> // Display the closed date
        )}
        {
          <button className="description flex items-center gap-1">
            {state()}
          </button>
        }
      </div>
    </div>
  );
}
