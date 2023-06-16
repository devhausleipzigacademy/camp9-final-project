'use client';

import { useFormContext } from 'react-hook-form';
import Button from 'components/shared/buttons/Button';
import InputField from '../InputField';

export default function AnswerOptions() {
  const { register } = useFormContext(); // retrieve all hook methods
  return (
    <div>
      <section></section>
      <hr></hr>
      <section>
        <div>
          <InputField
            required
            {...register('')}
            type="text"
            label="Option 1"
            showLabel={false}
            width="reduced"
            placeholder="Option 1"
          ></InputField>
          <Button className="button" children="-"></Button>
        </div>
        <div>
          <InputField
            required
            {...register('')}
            type="text"
            label="Option 2"
            showLabel={false}
            width="reduced"
            placeholder="Option 2"
          ></InputField>
          <Button className="button" children="-"></Button>
        </div>
        <Button variant="secondary" size="small" children="+ Option"></Button>
      </section>
    </div>
  );
}
