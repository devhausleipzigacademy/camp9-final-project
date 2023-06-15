'use client';

import Button from 'components/shared/buttons/Button';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function NewPollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
        <div className="mb-36 w-full flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
          <FormProvider {...methods}>
            <h1 className="title-black">Create a Poll</h1>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
          </FormProvider>
        </div>
      </main>

      <footer className="flex container gap-8 px-8 justify-between items-center bottom-28 fixed">
        <Button size="small" variant="secondary">
          <GrFormPrevious size={24} strokeWidth={2} />
          <h3>Back</h3>
        </Button>
        <Button size="large">
          <h3>Next</h3>
          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </footer>
    </>
  );
}
