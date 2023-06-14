import InputField from 'components/InputField';
import InputFieldComments from 'components/InputFieldComments';

export default function NewPoll() {
  return (
    <section className="flex flex-col gap-2">
      <h1 className="title-black">Create a Poll</h1>
      <InputField
        label={'Question'}
        showLabel={true}
        type={'text'}
        width={'full'}
        disabled={false}
      />
      <InputFieldComments
        label={'Comments'}
        type={'text'}
        width={'full'}
        disabled={false}
        rows={10}
      />
    </section>
  );
}
