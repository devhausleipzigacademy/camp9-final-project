'use client';

import CreatePoll from 'components/newPoll/CreatePoll';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

export default function App() {
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <h1 className="title-black">Create a Poll</h1>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CreatePoll />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
