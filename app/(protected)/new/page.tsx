'use client';

import { Prisma } from '@prisma/client';
import ProgressBar from 'components/ProgressBar';
import CreatePoll from 'components/newPoll/CreatePoll';
import Deadline from 'components/newPoll/Deadline';
import RevealConditions from 'components/newPoll/RevealConditions';
import PollType from 'components/newPoll/PollType';
import Button from 'components/shared/buttons/Button';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useMultiStepForm } from 'utils/useMultiStepForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import { NewPoll } from 'types/newPoll/NewPollSchema';
import { useMutation } from '@tanstack/react-query';

import { POSTReturnType as POSTNewPoll } from '@/app/api/new/route';

export default function NewPollLayout() {
  const methods = useForm<Omit<Prisma.PollCreateInput, 'creator'>>({
    defaultValues: {
      description: '',
      question: '',
      options: [''],
      endDateTime: new Date(),
      anonymity: 'Anonymous',
      quorum: 0,
      type: 'MultipleChoice',
    },
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

  const { steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultiStepForm(
      [<CreatePoll />, <PollType />, <RevealConditions />, <Deadline />],
      methods
    );

  const { handleSubmit, formState, reset } = methods;
  const { errors } = formState;

  const onSubmit: SubmitHandler<
    Omit<Prisma.PollCreateInput, 'creator'>
  > = data => {
    console.table(data);
    if (isLastStep) {
      // Handle form submission for the last step

      // Check if there are any validation errors
      if (Object.keys(errors).length === 0) {
        try {
          //  Create a new poll in the database
          // Additional logic for final submission
          console.log(data);
          // mutate(data);
          console.log('Poll created successfully!');
          reset(); // Clear the form fields
        } catch (error) {
          console.error('Error creating a poll:', error);
        }
      }
    } else {
      next(); // Proceed to the next step
    }
  };

  return (
    <>
      <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
        <div className="mb-36 w-full gap-4 flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
          <h1 className="title-black self-start">Create a Poll</h1>
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
        <Button size="small" variant="secondary" onClick={back}>
          <GrFormPrevious size={24} strokeWidth={2} />
          <h3>Back</h3>
        </Button>

        <Button
          size="large"
          className="ml-auto"
          onClick={handleSubmit(onSubmit)}
        >
          {isLastStep ? 'Create' : 'Next'}
          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </footer>
    </>
  );
}
