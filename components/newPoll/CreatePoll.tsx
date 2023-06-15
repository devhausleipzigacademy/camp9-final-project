import { useFormContext } from 'react-hook-form';
import InputField from '../InputField';

export default function CreatePoll() {
  const { register } = useFormContext(); // retrieve all hook methods
  return (
    <>
      <input {...register('test')} />
      <br />
      <br />
      <input {...register('test2')} />
    </>
  );
}
