'use client';

import { FormProvider, SubmitHandler, set, useForm } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useStepIndexStore from '@/utils/store';
import {
  CreateNewPoll,
  CreateNewPollSchema,
} from '@/types/newPoll/CreatePollSchema';
import { Poll } from '@prisma/client';

import AddParticipants from '@/components/createPoll/AddParticipants';
import AnswerOptions from '@/components/createPoll/AnswerOptions';
import CreateQuestion from '@/components/createPoll/CreateQuestion';
import Deadline from '@/components/createPoll/Deadline';
import RevealConditions from '@/components/createPoll/RevealConditions';
import Review from '@/components/createPoll/Review';
import ProgressBar from '@/components/shared/ProgressBar';
import Button from '@/components/shared/buttons/Button';

export default function CreatePoll() {
  const router = useRouter();

  const { stepIndex, decreaseStepIndex, increaseStepIndex, setStepIndex } =
    useStepIndexStore();

  const multiStepComponents = [
    <CreateQuestion key={CreateQuestion.name} />,
    <AnswerOptions key={AnswerOptions.name} />,
    <RevealConditions key={RevealConditions.name} />,
    <Deadline key={Deadline.name} />,
    <AddParticipants key={AddParticipants.name} />,
    <Review key={Review.name} />,
  ];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const methods = useForm<CreateNewPoll>({
    resolver: zodResolver(CreateNewPollSchema),
    mode: 'all',
    // defaultValues: useFormDataStore.getState().formData,
    defaultValues: {
      anonymity: 'AnonymousUntilQuorum',
      endDateTime: tomorrow,
      type: 'MultipleChoice',
      quorum: '80',
      options: [
        {
          option: '',
        },
        {
          option: '',
        },
      ],
    },
  });

  // useEffect(() => {
  //   // Save the form data to the store when it changes
  //   useFormDataStore.getState().setFormData(methods.getValues());
  // }, [methods]);

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

  const { mutate, isError } = useMutation(createNewPoll, {
    onSuccess: async () => {
      toast.success('Poll created!');
      // redirect to my polls page
      await router.push('/mypolls');
    },
    onError: error => {
      toast.error(axios.isAxiosError(error) ? error.response?.data : error);
    },
  });

  let keyArray: (keyof CreateNewPoll)[] = [];
  switch (stepIndex) {
    case 0:
      keyArray = ['question', 'description'];
      break;
    case 1:
      keyArray = ['options', 'type'];
      break;
    case 2:
      keyArray = ['anonymity', 'quorum'];
      break;
    case 3:
      keyArray = ['endDateTime'];
      break;
    case 4:
      keyArray = ['participants'];
      break;
  }

  useEffect(() => {
    return () => {
      // reset step index
      setStepIndex(0);
      // reset form
      methods.reset();
    };
  }, [methods, setStepIndex]);

  async function nextHandler() {
    if (stepIndex < multiStepComponents.length - 1) {
      const isValid = await methods.trigger(keyArray);
      if (!isValid) return;
      increaseStepIndex();
    }
  }

  async function prevHandler() {
    if (stepIndex > 0) {
      const isValid = await methods.trigger(keyArray);
      if (!isValid) return;
      decreaseStepIndex();
    }
  }
  // Form submission handler
  const onSubmit: SubmitHandler<CreateNewPoll> = data => {
    if (Object.keys(methods.formState.errors).length === 0) {
      try {
        mutate(data);
      } catch (error) {
        console.log('Error creating a poll: ', error);
      }
    }
  };

  return (
    <main className="container flex flex-col items-center h-screen justify-between bg-teal pt-8">
      <div className="mb-[156px] w-full flex flex-col overflow-x-hidden  overflow-y-hidden items-center justify-between  pr-8 gap-4">
        <div className="pl-8 w-full">
          <ProgressBar
            currentPage={stepIndex + 1}
            numberOfPages={multiStepComponents.length}
          />
        </div>
        <FormProvider {...methods}>
          <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
            {multiStepComponents[stepIndex]}

            <footer className="pl-8 flex container gap-10 pr-8 justify-between items-center bottom-[6.25rem] fixed">
              {stepIndex > 0 && !isError && (
                <Button
                  size="small"
                  type="button"
                  variant="secondary"
                  onClick={prevHandler}
                  disabled={Object.keys(methods.formState.errors).length !== 0}
                >
                  <GrFormPrevious size={24} strokeWidth={2} />
                  Back
                </Button>
              )}

              {stepIndex < multiStepComponents.length - 1 && (
                <Button
                  size="large"
                  type="button"
                  className={stepIndex === 0 ? 'w-full' : 'ml-auto'}
                  onClick={nextHandler}
                  disabled={Object.keys(methods.formState.errors).length !== 0}
                >
                  Next
                  <GrFormNext size={24} strokeWidth={2} />
                </Button>
              )}

              {stepIndex === multiStepComponents.length - 1 && !isError && (
                <Button size="large" type="submit" className="ml-auto">
                  Create
                </Button>
              )}
              {isError && (
                <Button
                  size="large"
                  type="button"
                  className="w-full"
                  onClick={() => {
                    setStepIndex(0);
                    methods.reset();
                  }}
                >
                  Try Again
                </Button>
              )}
            </footer>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
