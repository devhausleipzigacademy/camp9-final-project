'use client';

import ProgressBar from 'components/ProgressBar';
import CreatePoll from 'components/newPoll/CreatePoll';
import Deadline from 'components/newPoll/Deadline';
import RevealConditions from 'components/newPoll/RevealConditions';
import PollType from 'components/newPoll/PollType';
import Button from 'components/shared/buttons/Button';
import { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useMultiStepForm } from 'utils/useMultiStepForm';

export default function NewPollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { steps, currentStepIndex, isFirstStep, isLastStep, back, next } =
    useMultiStepForm([
      <CreatePoll />,
      <Deadline />,
      <PollType />,
      <RevealConditions />,
    ]);

  const onSubmit = (data: any) => {
    if (isLastStep) {
      // Handle form submission for the last step
      console.log(data);

      // Additional logic for final submission
      setIsSubmitted(true); // Set the submission status to true
      methods.reset(); // Clear the form fields
      window.alert('Poll created!'); // Show a success message
    } else {
      next(); // Proceed to the next step
    }
  };

  return (
    <>
      <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
        <div className="mb-36 w-full flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
          <h1 className="title-black">Create a Poll</h1>
          <ProgressBar
            currentPage={currentStepIndex + 1}
            numberOfPages={steps.length}
          />
          <br />
          <br />
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {steps[currentStepIndex]}
            </form>
          </FormProvider>
        </div>
      </main>

      <footer className="flex container gap-8 px-8 justify-between items-center bottom-28 fixed">
        {isFirstStep && (
          <Button size="small" variant="secondary" onClick={back}>
            <GrFormPrevious size={24} strokeWidth={2} />
            <h3>Back</h3>
          </Button>
        )}
        <Button
          size="large"
          className="ml-auto"
          onClick={methods.handleSubmit(onSubmit)}
        >
          {isLastStep ? 'Create' : 'Next'}
          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </footer>
    </>
  );
}
