'use client';

import { useFormContext } from 'react-hook-form';
import InputField from '../InputField';
import InputFieldDescription from 'components/InputFieldDescription';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';

export default function CreatePoll({
  title = 'Create a Poll',
}: NewPollComponentProps) {
  const { register, formState, getValues } = useFormContext<CreateNewPoll>(); // retrieve all hook methods

  return (
    <div className="flex flex-col gap-8 w-full">
      <InputField
        {...register('question', { required: true })}
        error={formState.errors.question}
        label={'Question'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
        placeholder="Your Question"
      />
      <InputFieldDescription
        {...register('description')}
        label={'Description'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
        rows={8}
        placeholder="Description (optional)"
      />
    </div>
  );
}
