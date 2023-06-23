'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Poll } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useMultiStepForm } from 'utils/useMultiStepForm';
import { toast } from 'react-toastify';
import axios from 'axios';

import {
  CreateNewPollSchema,
  CreateNewPoll,
} from '@/types/newPoll/CreatePollSchema';

import Button from '@/components/shared/buttons/Button';
import Deadline from '@/components/newPoll/Deadline';
import RevealConditions from '@/components/newPoll/RevealConditions';
import AnswerOptions from '@/components/newPoll/AnswerOptions';
import AddParticipants from '@/components/newPoll/AddParticipants';
import Review from '@/components/newPoll/Review';
import ProgressBar from '@/components/shared/ProgressBar';
import CreatePoll from '@/components/newPoll/CreatePoll';

export default function NewPoll() {
  // Form setup
  const methods = useForm<CreateNewPoll>({
    resolver: zodResolver(CreateNewPollSchema),
    mode: 'onTouched',
    defaultValues: {
      endDateTime: new Date(),
      anonymity: 'Anonymous',
      quorum: '80',
      type: 'MultipleChoice',
    },
  });

  // State variables
  const [currentStepTitle, setCurrentStepTitle] = useState('Create a Poll'); // Default title

  // API request to create a new poll
  async function createNewPoll(poll: CreateNewPoll) {
    try {
      const { data } = await axios.post<Poll>('/api/create', poll, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.error('Error creating a poll:', error);
      throw error;
    }
  }

  const { mutate, isLoading, isError, isSuccess } = useMutation(createNewPoll, {
    onSuccess: () => {
      toast.success('Poll created!');
      reset();
    },
    onError: error => {
      toast.error(axios.isAxiosError(error) ? error.response?.data : error);
    },
  });

  // Multi step form setup
  const { steps, currentStepIndex, isLastStep, isFormInProgress, back, next } =
    useMultiStepForm(
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

  // Update currentStepTitle when the index changes
  useEffect(() => {
    setCurrentStepTitle(steps[currentStepIndex]?.props.title);
  }, [currentStepIndex, steps]);

  const { handleSubmit, formState, reset, getValues } = methods;
  const { errors } = formState;

  // Form submission handler
  const onSubmit: SubmitHandler<CreateNewPoll> = data => {
    if (isLastStep) {
      if (Object.keys(errors).length === 0) {
        try {
          mutate(data);
          reset(); // Clear the form fields
          next(); // Proceed to the next step
        } catch (error) {
          console.error('Error creating a poll:', error);
        }
        next(); // Proceed to the next step
      }
    } else {
      next(); // Proceed to the next step
    }
  };

  console.log(formState.errors);

  return (
    <>
      <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
        {isFormInProgress && (
          <>
            <div className="mb-36 w-full flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
              <h1 className="title-black self-start">{currentStepTitle}</h1>

              <ProgressBar
                currentPage={currentStepIndex + 1}
                numberOfPages={steps.length}
              />

              <FormProvider {...methods}>
                <form className="w-full mt-5" onSubmit={handleSubmit(onSubmit)}>
                  {steps[currentStepIndex]}
                </form>
              </FormProvider>
            </div>

            <footer className="flex container gap-10 px-8 justify-between items-center bottom-28 fixed">
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

        {isLoading && (
          <div className="flex flex-col justify-center items-center">
            <img
              src="/images/flame-dreaming-of-unicorns.gif"
              className="w-[280px]"
            ></img>
            <h1 className="title-bold">Loading...</h1>
          </div>
        )}

        {isSuccess && (
          <div className="mb-36 w-full gap-4 flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
            <div className="mt-16 w-full flex flex-col gap-y-14 overflow-x-hidden overflow-y-scroll items-center justify-between">
              <h1 className="title-black text-center">
                Your poll has been created!
              </h1>
              <img src="./images/Results.png" alt="Image of Poll Created" />
            </div>
            <footer className="flex container px-16 flex-grow  justify-center items-center bottom-28 fixed">
              <Button size="full" href="/" className="py-6">
                Next
              </Button>
            </footer>
          </div>
        )}

        {isError && (
          <>
            <div className="flex flex-col justify-center items-center">
              <img src="/images/flame-479.gif" className="w-[280px]"></img>
              <h1 className="title-bold text-center">
                Woops! Something went wrong.
              </h1>
            </div>
            <footer className="flex container px-16 flex-grow  justify-center items-center bottom-28 fixed">
              <Button size="full" href="/create" className="py-6">
                Try Again
              </Button>
            </footer>
          </>
        )}
      </main>
    </>
  );
}
