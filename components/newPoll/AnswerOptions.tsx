'use client';

import { useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';
import Button from 'components/shared/buttons/Button';
import InputField from '../InputField';
import RadioButton from '../Radiobutton';

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
  const handleDeleteOption = (index: number) => {
    if (numOptions <= 2) return; // <-- prevent user from deleting all options

    setNumOptions(numOptions - 1);
    const options = getValues('options');
    // remove the given index from the array
    options.splice(index, 1);
  };

  const [type, setType] = useState({
    SingleChoice: false,
    MultipleChoice: true,
  });

  const onChangeCondition = (e: any) => {
    if (e.target.value === 'SingleChoice') {
      setType({ SingleChoice: true, MultipleChoice: false });
      setValue('type', 'SingleChoice');
    }
    if (e.target.value === 'MultipleChoice') {
      setType({ SingleChoice: false, MultipleChoice: true });
      setValue('type', 'MultipleChoice');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <fieldset className="flex flex-col font-semibold  gap-2">
        <div className="flex justify-between items-center ">
          <label className="align-middle">Single Choice</label>
          <RadioButton
            value={'SingleChoice'}
            checked={getValues('type') === 'SingleChoice'}
            {...register('type')}
            onChange={onChangeCondition}
          ></RadioButton>
        </div>
        <div className="flex flex-row justify-between body-semibold items-center mb-2">
          <label>Multiple Choice</label>
          <RadioButton
            value={'MultipleChoice'}
            checked={getValues('type') === 'MultipleChoice'}
            {...register('type')}
            onChange={onChangeCondition}
          ></RadioButton>
        </div>
      </fieldset>
      <hr className="border border-black"></hr>
      <fieldset className="flex pt-2 flex-col gap-2 justify-around">
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
              size="xs"
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
              size="small"
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
