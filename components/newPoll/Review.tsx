'use client';

import { useFormContext } from 'react-hook-form';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import PollDetailsCard from '../shared/PollDetailsCard';
import useStore from '@/utils/store';

export default function Review({
  title = 'Review & Submit',
}: NewPollComponentProps) {
  const { getValues } = useFormContext<CreateNewPoll>();
  const { setStepIndex } = useStore();

  const {
    question,
    description,
    type,
    anonymity,
    endDateTime,
    quorum,
    options,
  } = getValues();

  const date = new Date(endDateTime).toLocaleDateString();

  const steps = [
    { title: 'Poll Question', value: question, step: 0 },
    { title: 'Poll Description', value: description, step: 0 },
    { title: 'Poll Type', value: type, step: 1 },
    { title: 'Answer Options', value: options.map(option => option), step: 1 },
    { title: 'Anonymity', value: anonymity, step: 1 },
    { title: 'Reveal Conditions', value: quorum, step: 2 },
    { title: 'Deadline', value: date, step: 3 },
    { title: 'Participants', value: 'Pablo, Amir', step: 4 },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {steps.map((step, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setStepIndex(step.step)}
          className="text-start"
        >
          <PollDetailsCard title={step.title} children={step.value} />
        </button>
      ))}
    </div>
  );
}
