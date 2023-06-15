'use client';

import ProgressBar from 'components/ProgressBar';
import Button from 'components/shared/buttons/Button';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useMultiStepForm } from 'utils/useMultiStepForm';

export default function NewPollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm();

  const { steps, currentStepIndex, isFirstStep, back, next } = useMultiStepForm(
    [<div>ONE</div>, <div>TWO</div>, <div>THREE</div>]
  );

  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
        <div className="mb-36 w-full flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
          <h1 className="title-black">Create a Poll</h1>
          <ProgressBar
            currentPage={currentStepIndex + 1}
            numberOfPages={steps.length}
          />
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
          </FormProvider>
        </div>
      </main>

      <footer className="flex container gap-8 px-8 justify-between items-center bottom-28 fixed">
        {isFirstStep && (
          <Button size="small" variant="secondar y" onClick={back}>
            <GrFormPrevious size={24} strokeWidth={2} />
            <h3>Back</h3>
          </Button>
        )}
        <Button size="large" className="ml-auto" onClick={next}>
          {isLastStep ? 'Create' : 'Next'}

          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </footer>
    </>
  );
}
