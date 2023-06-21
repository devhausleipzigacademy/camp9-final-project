'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Prisma } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useMultiStepForm } from 'utils/useMultiStepForm';
import { toast } from 'react-toastify';
import axios from 'axios';

import { POSTReturnType as POSTNewPoll } from '@/app/api/create/route';
import { NewPoll, NewPollSchema } from '@/types/newPoll/NewPollSchema';

import AnswerOptions from '@/components/newPoll/AnswerOptions';
import AddParticipants from '@/components/newPoll/AddParticipants';
import Review from '@/components/newPoll/Review';
import PollCreatedStatus from '@/components/newPoll/PollCreatedStatus';
import Button from '@/components/shared/buttons/Button';
import Deadline from '@/components/newPoll/Deadline';
import CreatePoll from '@/components/newPoll/CreatePoll';
import ProgressBar from '@/components/ProgressBar';
import RevealConditions from '@/components/newPoll/RevealConditions';

export default function NewPoll() {
  const methods = useForm<Omit<Prisma.PollCreateInput, 'creator'>>({
    resolver: zodResolver(NewPollSchema),
    mode: 'onTouched',
    defaultValues: {
      // description: '',
      // question: '',
      // options: [''],
      endDateTime: new Date(),
      anonymity: 'Anonymous',
      quorum: 0,
      type: 'MultipleChoice',
    },
  });

  const [currentStepTitle, setCurrentStepTitle] = useState('Create a Poll'); // Default title

  async function createNewPoll(poll: NewPoll) {
    const { data } = await axios.post('/api/create', poll, {
      withCredentials: true,
    });
    console.log(data);
    return data as POSTNewPoll;
  }

  const { mutate } = useMutation(createNewPoll, {
    onSuccess: data => {
      toast.success('Poll created!');
      reset();
    },
    onError: error => {
      toast.error(axios.isAxiosError(error) ? error.response?.data : error);
    },
  });

  const { steps, currentStepIndex, isLastStep, back, next } = useMultiStepForm(
    [
      <CreatePoll title="Create a Poll" />,
      <AnswerOptions title="Answer Options" />,
      <RevealConditions title="Reveal Conditions" />,
      <Deadline title="Deadline" />,
      <AddParticipants title="Add Participants" />,
      <Review title="Review & Submit" />,
    ],
    methods
  );

  useEffect(() => {
    setCurrentStepTitle(steps[currentStepIndex]?.props.title); // Update the current step title
  }, [currentStepIndex, steps]);

  const { handleSubmit, formState, reset, getValues } = methods;
  const { errors } = formState;

  const onSubmit: SubmitHandler<
    Omit<Prisma.PollCreateInput, 'creator'>
  > = data => {
    if (isLastStep) {
      // Check if there are any validation errors
      if (Object.keys(errors).length === 0) {
        try {
          //  Create a new poll in the database
          // Additional logic for final submission
          console.log(data);
          mutate(data);
          console.log('Poll created successfully!');
          reset(); // Clear the form fields
          next(); // Proceed to the next step
        } catch (error) {
          console.error('Error creating a poll:', error);
        }
      }
    } else {
      next(); // Proceed to the next step
    }
  };

  console.log(steps.length);

  const pollSubmitted = currentStepIndex === steps.length;

  console.log({ currentStepIndex, steps, pollSubmitted });

  // console.log(getValues());

  return (
    <>
      {pollSubmitted && (
        <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
          <div className="mb-36 w-full gap-4 flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
            <PollCreatedStatus />,
          </div>
        </main>
      )}
      {!pollSubmitted && (
        <>
          <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
            <div className="mb-36 w-full gap-4 flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
              <h1 className="title-black self-start">{currentStepTitle}</h1>
              <ProgressBar
                currentPage={currentStepIndex + 1}
                numberOfPages={steps.length}
              />
              <FormProvider {...methods}>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                  {steps[currentStepIndex]}
                </form>
              </FormProvider>
            </div>
          </main>

          <footer className="flex container gap-8 px-8 justify-between items-center bottom-28 fixed">
            <Button
              size="small"
              variant="secondary"
              onClick={back}
              disabled={Object.keys(formState.errors).length !== 0}
            >
              <GrFormPrevious size={24} strokeWidth={2} />
              <h3>Back</h3>
            </Button>

            <Button
              size="large"
              className="ml-auto"
              onClick={!isLastStep ? next : handleSubmit(onSubmit)}
              disabled={Object.keys(formState.errors).length !== 0}
            >
              {isLastStep ? 'Create' : 'Next'}
              <GrFormNext size={24} strokeWidth={2} />
            </Button>
          </footer>
        </>
      )}
    </>
  );
}
