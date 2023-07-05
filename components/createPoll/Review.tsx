'use client';

import { useFormContext } from 'react-hook-form';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import PollDetailsCard from '../shared/PollDetailsCard';
import useStore from '@/utils/store';

export default function Review() {
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
    participants,
  } = getValues();

  const date = new Date(endDateTime).toLocaleDateString();
  const steps = [
    { title: 'Poll Question', value: question, step: 0 },
    { title: 'Poll Description', value: description, step: 0 },
    { title: 'Poll Type', value: type, step: 1 },
    {
      title: 'Answer Options',
      value: options.flatMap(option => option.option).join(', '),
      step: 1,
    },
    { title: 'Anonymity', value: anonymity, step: 2 },
    { title: 'Reveal Conditions', value: quorum, step: 2 },
    { title: 'Deadline', value: date, step: 3 },
    { title: 'Participants', value: participants?.join(', '), step: 4 },
  ];

  // Filter out steps with empty values
  const filteredSteps = steps.filter(
    step => step.value !== undefined && step.value !== null && step.value !== ''
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="title-black">Review & Submit</h3>
      {filteredSteps.map((step, index) => (
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
