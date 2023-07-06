'use client';

import {
  useVotePollMutation,
  useVotePollQuery,
} from '@/components/hooks/usePoll';
import ProgressBar from '@/components/shared/ProgressBar';
import Button from '@/components/shared/buttons/Button';
import { Mood } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ThankYouForVoting from '@/components/voting/ThankYouForVoting';
import VotingFeedback from '@/components/voting/VotingFeedback';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { zodResolver } from '@hookform/resolvers/zod';
import { VotePoll, voteSchema } from '@/types/voting/VotingSchema';
import VotingTypeChoice from '@/components/voting/VotingTypeChoice';
import QuestionVote from '@/components/voting/QuestionVote';
import VotingConditions from '@/components/voting/VotingConditions';

type Anonymity = 'Anonymous' | 'NonAnonymous' | 'AnonymousUntilQuorum';

export type UserAnswer = {
  anonymity: Anonymity;
  answer: string[];
  mood: Mood;
};

export default function Voting() {
  //extract the arguments from the URL

  const pathname = usePathname();
  const path = pathname.split('/');
  const userId = path[2]!;
  const pollId = path[3]!;
  const { query } = useVotePollQuery(userId, pollId);
  // const { mutate } = useVotePollMutation(userId);

  const multistepComponets = [
    <QuestionVote
      decription={query.data?.data.description}
      question={query.data?.data.question}
    />,
    <VotingConditions
      anonymity={query.data?.data.anonymity}
      quorum={query.data?.data.quorum}
    />,
    <VotingTypeChoice
      type={query.data?.data.type!}
      options={query.data?.data.options}
    />,
    <VotingFeedback />,
  ];

  const alreadyVoted = [<ThankYouForVoting />];

  const [step, setStep] = useState<number>(0);

  const methods = useForm<UserAnswer>({
    resolver: zodResolver(voteSchema),
    mode: 'all',
  });

  async function nextHandler() {
    if (step < multistepComponets.length - 1) {
      let keyArray: (keyof VotePoll)[] = [];
      switch (step) {
        case 1:
          keyArray = ['anonymity'];
          break;
        case 2:
          keyArray = ['answer'];
          break;
        case 3:
          keyArray = ['mood'];
          break;
      }
      const isValid = await methods.trigger(keyArray);
      if (!isValid) return;
      setStep(step + 1);
    }
  }

  function onSubmit(data: UserAnswer) {
    const userAnswer = query.data?.data.options?.map(option => {
      for (let i = 0; i < query.data?.data.options.length; i++) {
        if (data.answer[i] === 'abstain') return false;
        if (option === data.answer[i]) {
          return true;
        } else return false;
      }
    });
    const userVote = {
      answer: userAnswer,
      pollId: Number(pollId),
      userId: Number(userId),
      mood: data.mood,
    };
  }
  const titles = [
    'Question',
    'Voting Conditions',
    'Voting',
    'Give us your Feedback!',
  ];

  return (
    <main>
      <h1 className="title-bold text-left pb-4">{titles[step]}</h1>
      <ProgressBar
        currentPage={step + 1}
        numberOfPages={multistepComponets.length}
      />
      <FormProvider {...methods}>
        <form className="pt-4 ">
          {multistepComponets[step]}
          <footer className="fixed bottom-8 right-12 flex flex-row justify-end gap-16 w-3/4">
            {step > 0 && step < 4 && (
              <Button
                size="small"
                type="button"
                variant="secondary"
                onClick={() => setStep(step - 1)}
              >
                <GrFormPrevious size={24} strokeWidth={2} />
                Back
              </Button>
            )}
            {/**change this step to -2 to have it in the correct way */}

            {step < multistepComponets.length - 1 && (
              <Button
                size="medium"
                type="button"
                onClick={nextHandler}
                disabled={Object.keys(methods.formState.errors).length !== 0}
              >
                Next
                <GrFormNext size={24} strokeWidth={2} />
              </Button>
            )}
            {step === multistepComponets.length - 1 && (
              <Button
                size="medium"
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
                disabled={Object.keys(methods.formState.errors).length !== 0}
              >
                Submit
              </Button>
            )}
          </footer>
        </form>
      </FormProvider>
    </main>
  );
}
