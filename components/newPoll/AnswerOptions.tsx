'use client';

import { use, useEffect, useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import Button from 'components/shared/buttons/Button';
import InputField from '../InputField';

export default function AnswerOptions({
  title = 'Answer Options',
}: NewPollComponentProps) {
  const { register, formState, getValues, setValue } = useFormContext(); // retrieve all hook methods

  console.log(getValues());
  const [numOptions, setNumOptions] = useState(
    getValues('options')?.length || 1
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

  console.log('options', getValues('options'));
  console.log('numOptions', numOptions);

  return (
    <div className="flex flex-col">
      <fieldset></fieldset>
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
                type="button"
                size="xs"
                className="button"
                children="-"
                onClick={handleDeleteOption}
              ></Button>
            )}
          </div>
        ))}
        <div className="flex my-1">
          <Button
            type="button"
            className="ml-auto"
            variant="secondary"
            size="small"
            children="+ Option"
            onClick={handleAddOption}
          ></Button>
        </div>
      </fieldset>
    </div>
  );
}
