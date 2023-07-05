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
import { useSession } from 'next-auth/react';
import Loading from '@/components/voting/Loading';

type Anonymity = 'Anonymous' | 'NonAnonymous' | 'AnonymousUntilQuorum';

export type UserAnswer = {
  anonymity: Anonymity;
  answer: string[];
  mood: Mood;
};

export default function Voting() {
  //extract the arguments from the URL
  // const { data: session } = useSession();
  // console.log(session);
  const pathname = usePathname();
  const path = pathname.split('/');
  const pollId = path[2]!;
  const { query } = useVotePollQuery(pollId);
  const { mutate } = useVotePollMutation(pollId);

  const multistepComponets = [
    <QuestionVote
      description={query.data?.data.description}
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
      return data.answer.includes(option);
    });
    const userVote = {
      answer: userAnswer,
      pollId: Number(pollId),
      mood: data.mood,
    };
    // mutate(userVote);
    console.log(userVote);
  }

  if (query.data?.data.id === 107000) return alreadyVoted[0];
  if (query.isLoading) return <Loading />;

  return (
    <main>
      <ProgressBar
        currentPage={step + 1}
        numberOfPages={multistepComponets.length}
      />
      <FormProvider {...methods}>
        <form>
          {multistepComponets[step]}
          <div className="fixed bottom-24 right-8 flex flex-row justify-end gap-16 w-3/4">
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
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
