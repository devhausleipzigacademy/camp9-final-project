import InputField from 'components/InputField';

export default function Home() {
  return (
    <>
      <h1 className="title-black text-teal bg-yellow-light">Consensus App</h1>
      <div className=" m-10 w-40 h-40 bg-teal rounded border-brutal shadow-brutal "></div>
      <InputField type="text" width="full"></InputField>
    </>
  );
}
