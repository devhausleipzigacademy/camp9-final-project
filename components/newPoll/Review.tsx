'use client';

import { useFormContext } from 'react-hook-form';

import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';

import PollDetailsCard from '../shared/PollDetailsCard';
import { useState } from 'react';

export default function Review({
  title = 'Review & Submit',
}: NewPollComponentProps) {
  const { register, formState, getValues } = useFormContext<CreateNewPoll>(); // retrieve all hook methods

  const [stepIndex, setStepIndex] = useState<number>(0); // State variable to store the step index

  const date = new Date(getValues().endDateTime).toLocaleDateString();

  const { question, description, type, anonymity, endDateTime, quorum } =
    getValues();

  const handleClick = () => {
    setStepIndex(1); // Update the step index
    console.log(stepIndex);
  };

  return (
    <div className="flex flex-col gap-4 w-full ">
      <button
        className="text-start"
        type="button"
        onClick={() => handleClick()}
      >
        <PollDetailsCard title="Poll Question" children={question} />
      </button>
      {description && (
        <PollDetailsCard title="sPoll Description" children={description} />
      )}
      <PollDetailsCard title="Poll Type" children={type} />
      <PollDetailsCard title="Anonymity" children={anonymity} />
      <PollDetailsCard title="Deadline" children={date} />
      <PollDetailsCard title="Reveal Conditions" children={quorum} />
      <PollDetailsCard title="Participants" children="Pablo, Amir" />

      {/* <h2 className="font-semibold">
        Question:
        <span className="text-white"> {description}</span>
      </h2>
      <h2 className="font-semibold">
        Description:
        <span className="text-white"> {getValues().description}</span>
      </h2>
      <h2 className="font-semibold">
        Poll Type:
        <span className="text-white"> {getValues().type}</span>
      </h2>
      <h2 className="font-semibold">
        Anonymity:
        <span className="text-white"> {getValues().anonymity}</span>
      </h2>
      <h2 className="font-semibold">
        Deadline:
        <span className="text-white"> {date}</span>
      </h2>
      <h2 className="font-semibold">
        Reveal Conditions:
        <span className="text-white"> {getValues().quorum}</span>
      </h2>
      <h2 className="font-semibold">
        Participants:
        <span className="text-white">"Pablo, Amir"</span>
      </h2> */}
    </div>
  );
}
