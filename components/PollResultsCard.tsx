'use client';

interface PollResultsCardProps extends React.HTMLAttributes<HTMLElement> {
  question: string;
  landing?: boolean;
  children: string;
  endDate: Date;
  startDate: Date;
}

export default function PollResultsCard({
  children,
  endDate,
  ...props
}: PollResultsCardProps) {
  //   const router = useRouter()

  const currentDate = new Date();
  // Get the current date

  const date = new Date(endDate);
  // Get the end date of the poll

  return (
    <div className="cursor-pointer border-3 border-black rounded w-full flex flex-col pt-3 px-3 pb-1  bg-yellow gap-1 shadow-brutal">
      <h2 className="body-semibold">Poll Question</h2>
      //question needs to be taken via useContext?
      <div className="px-2 flex items-center justify-center border-3 h-[66px] border-black rounded-md bg-yellow-light ">
        <h1 className="body line-clamp-2">{children}</h1>
      </div>
    </div>
  );
}
