import { useFormContext } from 'react-hook-form';

export default function PollType() {
  const { register } = useFormContext(); // retrieve all hook methods

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3>Poll Type</h3>
      <fieldset>
        <legend>Please select your preferred contact method:</legend>
        <div>
          <label htmlFor="singleChoice">
            Single Choice
            <input
              {...register('type', { required: true })}
              type="radio"
              value="singleChoice"
              id="singleChoice"
            />
          </label>
          <label htmlFor="multipleChoice">
            Multiple Choice
            <input
              {...register('type', { required: true })}
              type="radio"
              value="multipleChoice"
              id="multipleChoice"
            />
          </label>
        </div>
      </fieldset>
    </div>
  );
}
