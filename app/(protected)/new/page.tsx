'use client';

import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { Prisma } from '@prisma/client';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';

import { NewPoll, NewPollSchema } from '@/types/newPoll/NewPollSchema';
import { useMultiStepForm } from 'utils/useMultiStepForm';

import ProgressBar from 'components/ProgressBar';
import CreatePoll from 'components/newPoll/CreatePoll';
import Deadline from 'components/newPoll/Deadline';
import RevealConditions from 'components/newPoll/RevealConditions';
import PollType from 'components/newPoll/PollType';
import Button from 'components/shared/buttons/Button';

import { POSTReturnType as POSTNewPoll } from '@/app/api/new/route';

export default function NewPollLayout() {
  const methods = useForm<Omit<Prisma.PollCreateInput, 'creator'>>({
    resolver: zodResolver(NewPollSchema),
    mode: 'onTouched',
    /*     defaultValues: {
      description: '',
      question: '',
      options: [''],
      endDateTime: new Date(),
      anonymity: 'Anonymous',
      quorum: 0,
      type: 'MultipleChoice',
    }, */
  });

  async function createNewPoll(poll: NewPoll) {
    const { data } = await axios.post('/api/new', poll, {
      withCredentials: true,
    });

    return data as POSTNewPoll;
  }

  // const { mutate } = useMutation(createNewPoll, {
  //   onSuccess: data => {
  //     toast.success('Poll created!');
  //     reset();
  //   },
  //   onError: error => {
  //     toast.error('Something went wrong!');
  //   },
  // });

  const { handleSubmit, formState, reset, trigger, watch } = methods;
  const { errors } = formState;

  const { steps, currentStepIndex, isLastStep, back, next } = useMultiStepForm(
    [<CreatePoll />, <PollType />, <RevealConditions />, <Deadline />],
    methods
  );
  const onSubmit: SubmitHandler<
    Omit<Prisma.PollCreateInput, 'creator'>
  > = data => {
    console.table(data);
    if (isLastStep) {
      if (Object.keys(errors).length === 0) {
        try {
          console.log('Poll created successfully!');
          reset(); // Clear the form fields
        } catch (error) {
          console.error('Error creating a poll:', error);
        }
      }
    } else {
      next();
    }
  };

  console.log(errors);

  return (
    <>
      <FormProvider {...methods}>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
            <div className="mb-36 w-full gap-4 flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
              <h1 className="title-black self-start">Create a Poll</h1>
              <ProgressBar
                currentPage={currentStepIndex + 1}
                numberOfPages={steps.length}
              />
              {steps[currentStepIndex]}
            </div>
          </main>

          <footer className="flex container gap-8 px-8 justify-between items-center bottom-28 fixed">
            <Button size="small" variant="secondary" onClick={back}>
              <GrFormPrevious size={24} strokeWidth={2} />
              <h3>Back</h3>
            </Button>

            <Button
              size="large"
              className="ml-auto"
              type={isLastStep ? 'submit' : 'button'}
              onClick={!isLastStep ? next : undefined}
              disabled={Object.keys(formState.errors).length !== 0}
            >
              {isLastStep ? 'Create' : 'Next'}
              <GrFormNext size={24} strokeWidth={2} />
            </Button>
          </footer>
        </form>
      </FormProvider>
    </>
  );
}
