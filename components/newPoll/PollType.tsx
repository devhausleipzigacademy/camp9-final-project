import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CustomRadio from './CustomRadio';

export default function PollType() {
  const { register } = useFormContext();
  const [numberOfOptions, setNumberOfOptions] = useState(2);

  const handleAddOption = () => {
    setNumberOfOptions(numberOfOptions + 1);
  };
  const handleDeleteOption = () => {
    setNumberOfOptions(numberOfOptions - 1);
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
              type="radio"
              value="SingleChoice"
              id="singleChoice"
            />
          </label>
          <label htmlFor="multipleChoice">
            Multiple Choice
            <CustomRadio checked={false} />
          </label>
        </div>
      </fieldset>
      <fieldset>
        {Array.from({ length: numberOfOptions }).map((_, index) => (
          <input
            key={index}
            type="text"
            {...register(`options[${index}]`, { required: true })}
          />
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
        <button type="button" onClick={handleDeleteOption}>
          Delete Option
        </button>
      </fieldset>
      <fieldset>
        {Array.from({ length: numberOfOptions }).map((_, index) => (
          <input
            key={index}
            type="text"
            {...register(`options[${index}]`, { required: true })}
          />
        ))}
        <button type="button" onClick={handleAddOption}>
          Add Option
        </button>
        <button type="button" onClick={handleDeleteOption}>
          Delete Option
        </button>
      </fieldset>
    </div>
  );
}
