'use client';

import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import { useFormContext } from 'react-hook-form';
import InputField from '../InputField';
import InputFieldDescription from '../InputFieldDescription';

export default function CreateQuestion() {
  const { register, formState } = useFormContext<CreateNewPoll>();

  return (
    <div className="flex flex-col gap-8 w-full">
      <h3 className="title-black">Create Poll</h3>
      <InputField
        {...register('question')}
        error={formState.errors.question}
        label="Question"
        type="text"
        width="full"
        placeholder="Your Question"
      />
      <InputFieldDescription
        {...register('description')}
        label="Description"
        rows={10}
        placeholder="Description (optional)"
      />
    </div>
  );
}
