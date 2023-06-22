'use client';

import { use, useEffect, useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import Button from 'components/shared/buttons/Button';
import InputField from '../InputField';

export default function AnswerOptions({
  title = 'Answer Options',
}: NewPollComponentProps) {
  const { register, formState, getValues, setValue } = useFormContext(); // retrieve all hook methods

  const [numOptions, setNumOptions] = useState(
    getValues('options')?.length || 2
  );

  const handleAddOption = () => {
    setNumOptions(numOptions + 1);
  };
  const handleDeleteOption = () => {
    setNumOptions(numOptions - 1);
    const options = getValues('options');
    // remove the given index from the array
    options.splice(numOptions - 1, 1);
  };

  // if the number of options is less than 2, then disable the + Option button
  const isSingleChoice = getValues('type') === 'SingleChoice';

  // if is single choice, then delete all other options from array
  useEffect(() => {
    if (isSingleChoice) {
      // render only one input field
      const options = getValues('options');
      options.splice(1, options.length - 1);
      setValue('options', options);
      setNumOptions(1);
    }
  }, [isSingleChoice]);

  return (
    <div className="flex flex-col">
      <fieldset className="flex flex-col font-semibold mb-7 gap-10">
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
      <fieldset className="flex flex-col justify-around">
        {Array.from({ length: numOptions }).map((_, index) => (
          <div className="flex flex-row justify-between my-1 overflow-scroll">
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
            {/* render from the second option on */}
            {index > 0 && (
              <Button
                variant="secondary"
                type="button"
                size="xxs"
                className="button"
                children="-"
                onClick={handleDeleteOption}
              ></Button>
            )}
          </div>
        ))}
        {!isSingleChoice && (
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
        )}
      </fieldset>
    </div>
  );
}
