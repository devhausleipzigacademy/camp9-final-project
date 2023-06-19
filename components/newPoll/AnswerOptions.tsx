'use client';

import { useFormContext } from 'react-hook-form';
import Button from 'components/shared/buttons/Button';
import InputField from '../InputField';

export default function AnswerOptions() {
  const { register } = useFormContext(); // retrieve all hook methods

  return (
    <div>
      <section></section>
      <hr className="border border-black"></hr>
      <section className="flex flex-col justify-around overflow-scroll">
        <div className="flex flex-row justify-between">
          <InputField
            {...register('options', { required: true })}
            type="text"
            label="Option 1"
            showLabel={false}
            width="reduced"
            placeholder="Option 1"
          ></InputField>
          <Button size="xs" className="button" children="-"></Button>
        </div>
        <div className="flex flex-row justify-between">
          <InputField
            {...register('options', { required: true })}
            type="text"
            label="Option 2"
            showLabel={false}
            width="reduced"
            placeholder="Option 2"
          ></InputField>
          <Button size="xs" className="button" children="-"></Button>
        </div>
        <div className="flex">
          <Button
            className="ml-auto"
            variant="secondary"
            size="small"
            children="+ Option"
          ></Button>
        </div>
      </section>
    </div>
  );
}
