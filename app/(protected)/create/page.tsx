'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

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
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const { data } = useSession(); // <-- get user ID object from session/JWT
  const userID = data?.user?.id;

  const methods = useForm<CreateNewPoll>({
    resolver: zodResolver(CreateNewPollSchema),
    mode: 'onTouched',
    defaultValues: {
      endDateTime: tomorrow,
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
      throw new Error();
      return data;
    } catch (error) {
      console.error('Error creating a poll:', error);
      throw error;
    }
  }

  const { mutate, isLoading, isError, isSuccess, isIdle } = useMutation(
    createNewPoll,
    {
      onSuccess: () => {
        toast.success('Poll created!');
        reset();
      },
      onError: error => {
        toast.error(axios.isAxiosError(error) ? error.response?.data : error);
        reset();
      },
    }
  );

  // Multi step form setup
  const { step, steps, currentStepIndex, isLastStep, back, next } =
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
    setCurrentStepTitle(step?.props.title);
  }, [currentStepIndex, steps]);

  const { handleSubmit, formState, reset, getValues } = methods;

  const { errors } = formState;

  // Form submission handler
  const onSubmit: SubmitHandler<CreateNewPoll> = data => {
    // add creator Id to data
    data.creator = userID as number;

    if (isLastStep) {
      if (Object.keys(errors).length === 0) {
        try {
          mutate(data);
        } catch (error) {
          console.error('Error creating a poll:', error);
        }
        reset(); // Clear the form fields
        next(); // Proceed to the next step
      }
    }
    next(); // Proceed to the next step
  };

  console.log(formState.errors);

  return (
    <>
      <main className="container flex flex-col items-center h-screen justify-between bg-teal pt-8">
        {isIdle && (
          <>
            <div className="mb-[156px] w-full flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between  pr-8 ">
              <div className="self-start pl-8 w-full ">
                <h1 className="title-black">{currentStepTitle}</h1>

                <ProgressBar
                  currentPage={currentStepIndex + 1}
                  numberOfPages={steps.length}
                />
              </div>

              <FormProvider {...methods}>
                <form
                  className="w-full mt-5 scrollbar  overflow-y-auto pb-2 pl-8 pr-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {step}
                </form>
              </FormProvider>
            </div>

            <footer className="flex container gap-10 px-8 justify-between items-center bottom-[6.25rem] fixed">
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

        {!isIdle && (
          <div className="flex flex-col gap-y-12 justify-center items-center mt-14 px-8">
            {isLoading && (
              <>
                <h1 className="title-bold text-center">Loading...</h1>
                <img
                  alt="Flame dreaming of unicorns"
                  src="/images/flame-dreaming-of-unicorns.gif"
                  className="px-12"
                ></img>
              </>
            )}

            {isSuccess && (
              <>
                <h1 className="title-bold text-center">
                  Your poll has been created!
                </h1>
                <img
                  src="./images/Results.png"
                  alt="Results"
                  className="px-12"
                ></img>
                <footer className="flex container px-16 flex-grow  justify-center items-center bottom-28 fixed">
                  <Button size="full" href="/new" className="py-6">
                    Next
                  </Button>
                </footer>
              </>
            )}

            {isError && (
              <>
                <h1 className="title-bold text-center">
                  Something went wrong...
                </h1>
                <img
                  alt="Flame dreaming of unicorns"
                  src="/images/fatal-error.png"
                  className="px-12"
                ></img>

                <footer className="flex container px-16 flex-grow  justify-center items-center bottom-28 fixed">
                  <Button size="full" href="/create" className="py-6">
                    Try Again
                  </Button>
                </footer>
              </>
            )}
          </div>
        )}
      </main>
    </>
  );
}
