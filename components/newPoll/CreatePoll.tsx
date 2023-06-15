import { useFormContext } from 'react-hook-form';
import InputField from '../InputField';

export default function CreatePoll() {
  const { register } = useFormContext(); // retrieve all hook methods
  return (
    <div className="flex flex-col gap-4 w-full">
      <h3>Question & Details</h3>
      <InputField
        required
        {...register('question')}
        label={'Create a poll'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
      />
      <InputField
        required
        {...register('description')}
        label={'Create a poll'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
      />
      <InputField
        required
        {...register('random name')}
        label={'Create a poll'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
      />
    </div>
  );
}
