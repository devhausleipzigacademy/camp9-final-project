'use client';

import { useFormContext } from 'react-hook-form';
import InputField from '../InputField';
import InputFieldDescription from 'components/InputFieldDescription';
import RadioButton from 'components/Radiobutton';

export default function CreatePoll({
  title = 'Create a Poll',
}: NewPollComponentProps) {
  const { register, formState, getValues } = useFormContext(); // retrieve all hook methods

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3>{title}</h3>
      <InputField
        {...register('question', { required: true })}
        error={{ message: formState.errors.question?.message as string }}
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
      <RadioButton variant={'primary'} />
    </div>
  );
}
