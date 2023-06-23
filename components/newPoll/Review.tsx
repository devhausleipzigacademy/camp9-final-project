'use client';

import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import { useFormContext } from 'react-hook-form';
import PollDetailsCard from '../shared/PollDetailsCard';

export default function Review({
  title = 'Review & Submit',
}: NewPollComponentProps) {
  const { register, formState, getValues } = useFormContext<CreateNewPoll>(); // retrieve all hook methods

  const date = new Date(getValues().endDateTime).toLocaleDateString();

  const { question, description, type, anonymity, endDateTime, quorum } =
    getValues();

  return (
    <div className="flex flex-col gap-4 w-full">
      <PollDetailsCard title="Poll Question" children={question} />
      {description && (
        <PollDetailsCard title="Poll Description" children={description} />
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
