'use client';

import { useFormContext } from 'react-hook-form';
import InputField from '../InputField';
import InputFieldDescription from 'components/InputFieldDescription';

export default function CreatePoll({
  title = 'Create a Poll',
}: NewPollComponentProps) {
  const { register, formState } = useFormContext(); // retrieve all hook methods

  return (
    <div className="flex flex-col gap-4 w-full">
      <InputField
        {...register('question', { required: true })}
        error={formState.errors.question}
        label={'Create a poll'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
        placeholder="What is your favorite color?"
      />
      <InputFieldDescription
        {...register('description')}
        label={'Create a poll'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
        rows={8}
        placeholder="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        "
      />
    </div>
  );
}
