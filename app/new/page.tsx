import InputField from 'components/InputField';
import InputFieldComments from 'components/InputFieldComments';

export default function Home() {
  return (
    <>
      <h1 className="title-black bg-teal">Create a Poll</h1>
      <InputField
        label={'Question (Poll Name)'}
        type={'text'}
        width={'full'}
        disabled={false}
        placeholder="Question (Poll Name)"
      />
      <InputFieldComments
        label={'Description'}
        type={'text'}
        width={'full'}
        disabled={false}
        placeholder="Description"
      />
    </>
  );
}
