import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import { useFormContext } from 'react-hook-form';

export default function Review({
  title = 'Review & Submit',
}: NewPollComponentProps) {
  const { register, formState, getValues } = useFormContext<CreateNewPoll>(); // retrieve all hook methods

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="font-semibold">
        Question:
        <span className="text-white"> {getValues().question}</span>
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
        <span className="text-white">
          {' '}
          {getValues().endDateTime.toLocaleString()}
        </span>
      </h2>
      <h2 className="font-semibold">
        Reveal Conditions:
        <span className="text-white"> {getValues().quorum}</span>
      </h2>
      <h2 className="font-semibold">
        Participants:
        <span className="text-white">"Pablo, Amir"</span>
      </h2>
    </div>
  );
}
