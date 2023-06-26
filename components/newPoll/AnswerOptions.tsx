'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../shared/buttons/Button';
import InputField from '../InputField';
import RadioButton from '../Radiobutton';

export default function AnswerOptions() {
  const { register, getValues, setValue } = useFormContext(); // retrieve all hook methods
  const [numOptions, setNumOptions] = useState(2);
  const handleAddOption = () => {
    setNumOptions(numOptions + 1);
  };
  const handleDeleteOption = () => {
    setNumOptions(numOptions - 1);
  };

  const [type, setType] = useState({
    SingleChoice: false,
    MultipleChoice: false,
  });
  console.log(getValues());

  const onChangeCondition = (e: any) => {
    const { name } = e.target;

    if (name === 'Single Choice') {
      setType({ SingleChoice: true, MultipleChoice: false });
    }
    if (name === 'Multiple Choice') {
      setType({ SingleChoice: false, MultipleChoice: true });
    }
  };
  return (
    <div className="flex flex-col">
      <fieldset>
        <div className="flex flex-row justify-between body-semibold">
          <label className="align-middle">Single Choice</label>
          <RadioButton
            name="Single Choice"
            value={'SingleChoice'}
            onChange={onChangeCondition}
            checked={type.SingleChoice}
            onClick={() => {
              setValue('type', 'SingleChoice');
            }}
            // {...register('type')}
          ></RadioButton>
        </div>
        <div className="flex flex-row justify-between body-semibold items-center mb-2">
          <label>Multiple Choice</label>
          <RadioButton
            name="Multiple Choice"
            value={'Multiple Choice'}
            onChange={onChangeCondition}
            checked={type.MultipleChoice}
            onClick={() => {
              setValue('type', 'MultipleChoice');
            }}
            //{...register('type')}
          ></RadioButton>
        </div>
      </fieldset>
      <hr className="border border-black"></hr>
      <fieldset className="flex flex-col justify-around">
        {Array.from({ length: numOptions }).map((_, index) => (
          <div className="flex flex-row justify-between my-1 overflow-scroll">
            <InputField
              {...register(`options[${index}]`, { required: true })}
              key={index}
              type="text"
              label={`Option ${index + 1}`}
              showLabel={false}
              width="reduced"
              placeholder={`Option ${index + 1}`}
            ></InputField>
            <Button
              type="button"
              size="xs"
              className="button"
              children="-"
              onClick={handleDeleteOption}
            ></Button>
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
