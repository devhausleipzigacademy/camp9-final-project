'use client';

import clsx from 'clsx';
import Image from 'next/image';

// question needs to be taken via useContext?

interface PollResultsCardProps extends React.HTMLAttributes<HTMLElement> {
  pollQuestion: string;
  endDate: Date;
  startDate: Date;
  children: React.ReactNode;
}

export default function PollResultsCard({
  pollQuestion,
  endDate,
  startDate,
  children,
}: PollResultsCardProps) {
  return (
    <div className="cursor-pointer border-3 border-black rounded h-[370px] w-full pt-3 px-3 pb-1  bg-yellow gap-1 ">
      <h2 className="body-semibold mb-2">{pollQuestion}</h2>
      {children}
    </div>
  );
}

type PollResultsContentCardProps = {
  children: React.ReactNode;
  className: string;
};

export function PollResultsCardContent({
  children,
  className,
}: PollResultsContentCardProps) {
  return (
    <div
      className={clsx(
        className,
        'pl-4 pr-3 pt-5 pb-2 items-center justify-center border-3 border-black rounded-md bg-yellow-light'
      )}
    >
      {children}
    </div>
  );
}

PollResultsCard.Content = PollResultsCardContent;
