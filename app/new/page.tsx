'use client';

import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

export default function App() {


  return (
    <>
      <h1 className="title-black">Create a Poll</h1>

      <NestedInput />
      <input type="submit" />
    </>
  );
}

function NestedInput() {
  const { register } = useFormContext(); // retrieve all hook methods
  return (
    <>
      <input {...register('test')} />
      <br />
      <br />
      <br />
      <br />
      <input {...register('test2')} />
    </>
  );
}
