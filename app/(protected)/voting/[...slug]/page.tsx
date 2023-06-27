'use client';

import {
  useVotePollMutation,
  useVotePollQuery,
} from '@/components/hooks/usePoll';
import { superSidekickHoock } from '@/components/hooks/useVote';
import ProgressBar from '@/components/shared/ProgressBar';
import Button from '@/components/shared/buttons/Button';
import { Mood } from '@prisma/client';

import clsx from 'clsx';

import { usePathname } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PrismaClient } from '@prisma/client';

// type VoteResponse = {
//   message: string;
// };

// type myVote = {
//   id: number;
//   answer: boolean[];
//   pollId: number;
//   userId: number;
// };

export type UserAnswer = {
  abstain: boolean;
  multipleChoice: { [key: string]: boolean };
  singleChoice: string;
  Anonymous: boolean;
  NonAnonymous: boolean;
  AnonymousUntilQuorum: boolean;
  mood: Mood;
};

export type VoteAnswer = {
  answer: boolean[];
  pollId: number;
  userId: number;
  mood: Mood;
};

export default function Voting() {
  //extract the arguments from the URL
  const pathname = usePathname();
  const path = pathname.split('/');
  const userId = path[2]!;
  const pollId = path[3]!;
  const { query } = useVotePollQuery(userId, pollId);
  const { mutate } = useVotePollMutation(userId);

  const [step, setStep] = useState<number>(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});
  const abstain = watch('abstain');
  const { typeOfPoll, header, buttons, anonymity, isLoading, handleMoods } =
    superSidekickHoock({
      query,
      step,
      setStep,
      register,
      abstain,
    });

  function onSubmit(data: UserAnswer) {
    const userAnswerArray = Object.values(data.multipleChoice || {});
    // const userSingleAnswerArray = Object.values(data.singleChoice || {});
    if (abstain) {
      for (let i = 0; i < userAnswerArray.length; i++) {
        userAnswerArray[i] = false;
      }
    }
  
    const singleAnswer = data.singleChoice;
    if (singleAnswer) {
      query.data?.data.options.map(option => {
        return option === data.singleChoice;
      });
    }

    const userVote = {
      answer: singleAnswer,
      pollId: Number(pollId),
      userId: Number(userId),
      mood: data.mood,
    };
    console.log('data', userVote);
    // mutate(userVote);
  }

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
        <ProgressBar numberOfPages={4} currentPage={step} />
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {anonymity}
        {typeOfPoll}
        {handleMoods}
        <Button
          size="small"
          type="submit"
          variant="quaternary"
          className={clsx(
            'fixed container bottom-28 right-8',
            step === 4 ? 'visble' : 'hidden'
          )}
        >
          Submit
        </Button>
      </form>
      {buttons}
    </div>
  );
}
