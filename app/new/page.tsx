'use client';

import { Prisma } from '@prisma/client';
import ProgressBar from 'components/ProgressBar';
import CreatePoll from 'components/newPoll/CreatePoll';
import Deadline from 'components/newPoll/Deadline';
import RevealConditions from 'components/newPoll/RevealConditions';
import PollType from 'components/newPoll/PollType';
import Button from 'components/shared/buttons/Button';
import { useForm, FormProvider } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useMultiStepForm } from 'utils/useMultiStepForm';

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

  const { steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <CreatePoll />,
      <PollType />,
      <RevealConditions />,
      <Deadline />,
    ]);

  const { handleSubmit, formState, reset } = methods;
  const { errors } = formState;

  const onSubmit = (data: any) => {
    console.log(data);
    if (isLastStep) {
      // Handle form submission for the last step
      console.log(data);

      // Check if there are any validation errors
      if (Object.keys(errors).length === 0) {
        // Additional logic for final submission
        reset(); // Clear the form fields
        window.alert('Poll created!'); // Show a success message
      }
    } else {
      next(); // Proceed to the next step
    }
  };

  return (
    <>
      <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
        <div className="mb-36 w-full gap-4 flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
          <h1 className="title-black">Create a Poll</h1>
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
// const pollData: Prisma.PollCreateInput = {
//   creator: {
//     connect: {
//       id: 1,
//     },
//   },
//   description: '',
//   question: '',
//   options: [''],
//   endDateTime: new Date(),
//   anonymity: 'Anonymous',
//   quorum: 0,
//   type: 'MultipleChoice',
// };
