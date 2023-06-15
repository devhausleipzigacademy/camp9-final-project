import { useFormContext } from 'react-hook-form';
import InputField from '../InputField';

export default function CreatePoll() {
  const { register } = useFormContext(); // retrieve all hook methods
  return (
    <>
      <div>Deadline</div>
      <InputField
        required
        {...register('test3')}
        label={'Create a poll'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
      />
      <InputField
        required
        {...register('test3')}
        label={'Create a poll'}
        showLabel={false}
        type={'text'}
        width={'full'}
        disabled={false}
      />
    </>
  );
}
