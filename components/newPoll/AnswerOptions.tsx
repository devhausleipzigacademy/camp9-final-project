'use client';

import { useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import Button from 'components/shared/buttons/Button';
import InputField from '../InputField';

export default function AnswerOptions({
  title = 'Answer Options',
}: NewPollComponentProps) {
  const { register, formState, getValues } = useFormContext(); // retrieve all hook methods

  const [numOptions, setNumOptions] = useState(
    getValues('options')?.length || 2
  );

  const handleAddOption = () => {
    setNumOptions(numOptions + 1);
  };
  const handleDeleteOption = (index: number) => {
    if (numOptions <= 2) return; // <-- prevent user from deleting all options

    setNumOptions(numOptions - 1);
    const options = getValues('options');
    // remove the given index from the array
    options.splice(index, 1);
  };

  return (
    <div className="flex flex-col gap-5">
      <fieldset className="flex flex-col font-semibold  gap-5">
        <div className="flex justify-between items-center ">
          <label className="text-black" htmlFor="singleChoice">
            Single Choice
          </label>
          <input
            {...register('type')}
            type="radio"
            id="singleChoice"
            value="SingleChoice"
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-black" htmlFor="multipleChoice">
            Multiple Choice
          </label>
          <input
            {...register('type')}
            type="radio"
            id="multipleChoice"
            value="MultipleChoice"
          />
        </div>
      </fieldset>
      <hr className="border border-black"></hr>
      <fieldset className="flex flex-col gap-5 justify-around">
        {Array.from({ length: numOptions }).map((_, index) => (
          <div className="flex flex-row justify-between overflow-scroll">
            <InputField
              {...register(`options[${index}]`, { required: true })}
              value={getValues('options')?.[index]}
              key={index}
              type="text"
              label={`Option ${index + 1}`}
              showLabel={false}
              width="reduced"
              placeholder={`Option ${index + 1}`}
              error={
                (formState.errors.options as FieldErrors)?.[index] // Cast 'errors.options' as FieldErrors
              }
            />

            <Button
              variant="secondary"
              type="button"
              size="xxs"
              className="button"
              children="-"
              onClick={() => handleDeleteOption(index)} // Pass the index to handleDeleteOption
            ></Button>
          </div>
        ))}

        {
          <div className="flex my-1">
            <Button
              type="button"
              size="xs"
              className="ml-auto"
              variant="secondary"
              children="+ Option"
              onClick={handleAddOption}
            ></Button>
          </div>
        }
      </fieldset>
    </div>
  );
}
