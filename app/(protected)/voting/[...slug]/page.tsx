'use client';

import Questionbox from '@/components/Question';
import { useVotePollQuery } from '@/components/hooks/usePoll';
import { superSidekickHoock } from '@/components/hooks/useVote';
import ProgressBar from '@/components/shared/ProgressBar';
import Button from '@/components/shared/buttons/Button';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type VoteResponse = {
  message: string;
};

type myVote = {
  id: number;
  answer: boolean[];
  pollId: number;
  userId: number;
};

export default function Voting() {
  //extract the arguments from the URL
  const pathname = usePathname();
  const path = pathname.split('/');
  const [step, setStep] = useState<number>(1);

  if (path[2] === undefined || path[3] === undefined) {
    return <>Sorry</>;
  }
  const { query } = useVotePollQuery(path[2], path[3]);

  const { typeOfPoll, header, buttons, anonymity, isLoading } =
    superSidekickHoock({
      query,
      step,
      setStep,
    });

  // async function sendPoll(vote: myVote) {
  //   const { data } = await axios.post('/api/voting', vote, {
  //     withCredentials: true,
  //   });
  // }

  // function useSendVote() {
  //   const {
  //     register,
  //     formState: { errors },
  //     reset,
  //     handleSubmit,
  //     formState,
  //   } = useForm<myVote>({
  //     resolver: zodResolver(),
  //     mode: 'onTouched',
  //   });

  //   const mutation = useMutation<VoteResponse, AxiosError, myVote>({
  //     mutationFn: (vote: myVote) => sendPoll(vote),
  //   });
  //   return { mutation, register, errors, handleSubmit, formState };
  // }

  if (query.isLoading)
    return (
      <div className="mt-20">
        <h2 className="title-bold">Looking for your poll!</h2>
        <div>{isLoading}</div>
      </div>
    );

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col ">
        <h1 className="title-black text-left">{header}</h1>
        <ProgressBar numberOfPages={3} currentPage={step} />
      </div>
      <div
        className={clsx(
          'flex flex-col gap-4 mt-4',
          step === 1 ? 'visible' : 'hidden'
        )}
      >
        <div className="questionVote w-full h-auto p-2 border-3 border-solid border-black bg-peach rounded-md">
          {query.data?.data.question}
        </div>
        <div>
          <h2 className="description-semibold">Description:</h2>
          <div className="overflow-y-auto h-[200px] scrollbar">
            <p className="description-light text-justify">
              {query.data?.data.description}
            </p>
          </div>
        </div>
      </div>

      <form>
        {anonymity}
        {typeOfPoll}
        <Button
          size="small"
          type="submit"
          variant="quaternary"
          className={clsx(
            'fixed container bottom-28 right-8',
            step === 3 ? 'visble' : 'hidden'
          )}
        >
          Submit
        </Button>
      </form>
      {buttons}
    </div>
  );
}
