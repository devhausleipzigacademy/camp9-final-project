import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type PollCardProps = {
  children: React.ReactNode;
  endTime: Date;
  vote?: 'vote';
  details?: 'see details';
  results?: 'see results';
  href: string;
  className?: string;
};

function PollCard(props: PollCardProps) {
  return (
    <div className={clsx('', props.className)}>
      <div className="bg-yellow  p-3 pb-0 shadow-shadow border-3 border-black rounded-round w-full">
        <div className="bg-yellow-light h-auto border-black border-3 rounded-round p-2">
          {props.children}
        </div>
        <div className="flex justify-between items-center small">
          {props.endTime.toDateString()}
          <Link href={props.href} className="flex text-sm items-center">
            {props.vote}
            {props.details}
            {props.results}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PollCard;
