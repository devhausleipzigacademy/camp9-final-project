import { HiArrowUpRight } from 'react-icons/hi2';
import { IoCheckmark } from 'react-icons/io5';

interface PollCardProps {
  question: string;
  voteButton: boolean;
  voted: boolean;
  dateInput: Date;
}

export default function PollCard({
  question,
  dateInput,
  voted,
  voteButton,
}: PollCardProps) {
  const currentDate = new Date(); // Get the current date

  const date = new Date(dateInput); // Convert date input string to Date object

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

  return (
    <section className="border-3 border-black rounded w-full flex flex-col p-4 justify-between bg-yellow shadow-brutalist gap-2">
      <div className="p-3 border-3 border-black rounded-md bg-yellow-light flex-1 flex items-center justify-center">
        <h1 className="landing-quote overflow-auto">{question}</h1>
        {/* Display the question */}
      </div>
      <div className="flex justify-between items-center overflow-auto gap-1">
        {isOpen ? (
          <p className="small">
            Closes in
            {
              <span className="small-bold">
                {' '}
                {`${
                  displayDays
                    ? `${displayDays} ${pluralize(displayDays, 'day')},` // Display the number of days
                    : ''
                } ${
                  displayHours
                    ? `${displayHours} ${pluralize(displayHours, 'hour')},` // Display the number of hours
                    : ''
                } ${
                  displayMinutes
                    ? `${displayMinutes} ${pluralize(displayMinutes, 'minute')}` // Display the number of minutes
                    : ''
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
        {voteButton && !voted && isOpen && (
          <button className="description flex items-center gap-1">
            Vote <HiArrowUpRight size={15} />
          </button>
        )}
        {voteButton && voted && (
          <button className="description flex items-center gap-1">
            Voted
            <IoCheckmark size={15} />
          </button>
        )}
      </div>
    </section>
  );
}
