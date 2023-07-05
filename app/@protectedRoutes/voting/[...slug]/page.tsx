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
import { useState } from 'react';
import { FormProvider, set, useForm } from 'react-hook-form';
import Image from 'next/image';
import ThankYouForVoting from '@/components/voting/ThankYouForVoting';
import VotingFeedback from '@/components/voting/VotingFeedback';
import VotingMultipleChoice from '@/components/voting/VotingMultipleChoice';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import VotingSingleChoice from '@/components/voting/VotingTypeChoice';
import { zodResolver } from '@hookform/resolvers/zod';
import { voteSchema } from '@/types/voting/VotingSchema';
import VotingTypeChoice from '@/components/voting/VotingTypeChoice';
import QuestionVote from '@/components/voting/QuestionVote';
import VotingConditions from '@/components/voting/VotingConditions';

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
  answer: boolean[] | undefined;
  pollId: number;
  userId: number;
  mood: string;
};

export default function Voting() {
  //extract the arguments from the URL

  const pathname = usePathname();
  const path = pathname.split('/');
  const userId = path[2]!;
  const pollId = path[3]!;
  const { query } = useVotePollQuery(userId, pollId);
  // const { mutate } = useVotePollMutation(userId);

  console.log('Query', query);
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
    <ThankYouForVoting />,
  ];

  const [step, setStep] = useState<number>(0);

  const methods = useForm({
    resolver: zodResolver(voteSchema),
    mode: 'all',
  });

  console.log('Errors', methods.formState.errors);
  console.log('Values', methods.getValues());
  function nextHandler() {
    // if (step < multistepComponets.length - 1) {
    //   let keyArray: (keyof CreateNewPoll)[] = [];
    //   switch (step) {
    //     case 0:
    //       keyArray = ['question', 'description'];
    //       break;
    //     case 1:
    //       keyArray = ['options', 'type'];
    //       break;
    //     case 2:
    //       keyArray = ['anonymity', 'quorum'];
    //       break;
    //     case 3:
    //       break;
    //     case 4:
    //       keyArray = ['participants'];
    //   }
    //   const isValid = await methods.trigger(keyArray);
    //   if (!isValid) return;
    setStep(step + 1);
  }

  // const {
  //   typeOfPoll,
  //   header,
  //   buttons,
  //   anonymity,
  //   isLoading,
  //   handleMoods,
  //   footer,
  // } = superSidekickHoock({
  //   query,
  //   step,
  //   setStep,
  //   register,

  //   mood,
  //   setMood,
  // });

  // function onSubmit(data: UserAnswer) {
  //   if (data.singleChoice) {
  //     const answerOptions = query.data?.data.options;
  //     const userAnswerSingle = answerOptions?.map(option => {
  //       if (option === data.singleChoice) {
  //         return true;
  //       } else return false;
  //     });
  //     const userVote = {
  //       answer: userAnswerSingle,
  //       pollId: Number(pollId),
  //       userId: Number(userId),
  //       mood: mood,
  //     };
  //     mutate(userVote);
  //   }

  //   if (data.multipleChoice) {
  //     const userAnswerMultiple = Object.values(data.multipleChoice);
  //     if (data.multipleChoice) {
  //       for (let i = 0; i < userAnswerMultiple.length; i++) {
  //         userAnswerMultiple[i] = false;
  //       }
  //     }
  //     const userVote = {
  //       answer: userAnswerMultiple,
  //       pollId: Number(pollId),
  //       userId: Number(userId),
  //       mood: mood,
  //     };
  //     mutate(userVote);
  //   }
  // }

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <main>
      <ProgressBar
        currentPage={step + 1}
        numberOfPages={multistepComponets.length}
      />
      <FormProvider {...methods}>
        <form>
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
                onClick={() => setStep(step + 1)}
                disabled={Object.keys(methods.formState.errors).length !== 0}
              >
                Next
                <GrFormNext size={24} strokeWidth={2} />
              </Button>
            )}
            {step === multistepComponets.length - 2 && (
              <Button
                size="medium"
                type="submit"
                onClick={methods.handleSubmit(onSubmit)}
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
