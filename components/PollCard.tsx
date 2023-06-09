import Link from 'next/link';

interface PollCardProps {
  children: string;
  dateInput: Date;
  href: string;
  icon?: React.ReactNode;
}

export default function PollCard({
  children,
  dateInput,
  icon,
  href,
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
    <Link
      className="border-3 h-28 border-black rounded w-full flex flex-col pt-3 px-3 pb-1 it justify-between bg-yellow gap-1 shadow-brutal "
      href={href}
    >
      <div className="px-2  flex items-center justify-center border-3 h-24 border-black rounded-md bg-yellow-light ">
        <h1 className="body line-clamp-2">{children}</h1>
      </div>
      <div className="flex justify-between items-center  gap-1">
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
        {icon && (
          <button
            onClick={() => console.log('hi')}
            className="description flex items-center gap-1"
          >
            {icon}
          </button>
        )}
      </div>
    </Link>
  );
}
