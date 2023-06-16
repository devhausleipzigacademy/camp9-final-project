import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function PollType() {
  const { register } = useFormContext();
  const [numberOfOptions, setNumberOfOptions] = useState(0);

  const handleAddOption = () => {
    setNumberOfOptions(numberOfOptions + 1);
  };

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
              type="checkbox"
              value="singleChoice"
              id="singleChoice"
            />
          </label>
          <label htmlFor="multipleChoice">
            Multiple Choice
            <input
              {...register('type', { required: true })}
              type="checkbox"
              value="multipleChoice"
              id="multipleChoice"
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        {Array.from({ length: numberOfOptions }).map((_, index) => (
          <input
            key={index}
            type="text"
            data-group="lui"
            {...register(`options[${index}]`, { required: true })}
          />
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
      </fieldset>
    </div>
  );
}
