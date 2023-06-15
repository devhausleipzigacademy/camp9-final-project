'use client';

import CreatePoll from 'components/newPoll/CreatePoll';
import React from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

export default function App() {
  return (
    <>
      <br />
      <CreatePoll />
      <input type="submit" />
    </>
  );
}


