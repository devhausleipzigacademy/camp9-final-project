'use client';

import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

export default function App() {
  return (
    <>
      <br />
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
      <input {...register('test2')} />
    </>
  );
}
