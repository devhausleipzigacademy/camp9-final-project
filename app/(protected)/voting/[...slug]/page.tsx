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
import { ContextExclusionPlugin } from 'webpack';

type VoteResponse = {
  message: string;
};

type myVote = {
  id: number;
  answer: boolean[];
  pollId: number;
  userId: number;
};

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
  const [mood, setMood] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({});
  const abstain = watch('abstain') as boolean;
  const anonymWatch = watch(
    'NonAnynymous' || 'Anonymous' || 'AnonymousUntilQuorum'
  ) as boolean;
  const voteWatch = watch('singleChoice') as boolean;

  const {
    typeOfPoll,
    header,
    buttons,
    anonymity,
    isLoading,
    handleMoods,
    footer,
  } = superSidekickHoock({
    query,
    step,
    setStep,
    register,
    abstain,
    voteWatch,
    mood,
    setMood,
    anonymWatch,
  });

  function onSubmit(data: UserAnswer) {
    if (data.singleChoice) {
      const answerOptions = query.data?.data.options;
      const userAnswerSingle = answerOptions?.map(option => {
        if (option === data.singleChoice) {
          return true;
        } else return false;
      });
      const userVote = {
        answer: userAnswerSingle,
        pollId: Number(pollId),
        userId: Number(userId),
        mood: mood,
      };
      console.log(userVote);
    }

    if (data.multipleChoice) {
      const userAnswerMultiple = Object.values(data.multipleChoice);
      if (abstain) {
        for (let i = 0; i < userAnswerMultiple.length; i++) {
          userAnswerMultiple[i] = false;
        }
      }
      const userVote = {
        answer: userAnswerMultiple,
        pollId: Number(pollId),
        userId: Number(userId),
        mood: mood,
      };
      console.log(userVote);
    }
  }

  if (query.isLoading)
    return (
      <div className="mt-20">
        <h2 className="title-bold">Looking for your poll!</h2>
        <div>{isLoading}</div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="title-bold text-left">{header}</h1>
      <ProgressBar numberOfPages={4} currentPage={step} />
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
        <div
          className={clsx(
            'flex flex-row justify-center align-middle items-center mt-6',
            step === 4 ? 'visble' : 'hidden'
          )}
        >
          <Button size="large" type="submit" variant="primary" disabled={!mood}>
            Submit
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-3 items-center">
        {buttons}
        {footer}
      </div>
    </div>
  );
}
