'use client';

import { useFormContext } from 'react-hook-form';
import InputField from '../InputField';
import InputFieldComments from '../InputFieldComments';

export default function CreatePoll() {
  const { register } = useFormContext(); // retrieve all hook methods
  return (
    <>
      <input {...register('test')} />
      {/* <InputField
        label={''}
        showLabel={false}
        type={'number'}
        width={'full'}
        {...register('test')}
      /> */}
    </>
  );
}
