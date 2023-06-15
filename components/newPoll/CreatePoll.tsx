import { useFormContext } from 'react-hook-form';
import InputField from '../InputField';
import InputFieldDescription from 'components/InputFieldDescription';

export default function CreatePoll() {
  const { register } = useFormContext(); // retrieve all hook methods

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3>Question & Details</h3>
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
      <InputField
        required
        {...register('question', { required: true })}
        label={'Create a poll'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
      />
      <InputFieldDescription
        {...register('description')}
        label={'Create a poll'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
        rows={4}
      />
    </div>
  );
}
