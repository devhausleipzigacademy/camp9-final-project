import TestButton from '@/components/TestButton';
import { authOptions } from '@/libs/auth';
import { getServerSession } from 'next-auth';

async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <>
      <h1 className="title-black text-teal bg-yellow-light">Consensus App</h1>
      <div className=" m-10 w-40 h-40 bg-green rounded border-brutal shadow-brutal "></div>

      <h1>Server Session // tutorial</h1>
      <pre>{JSON.stringify(session)}</pre>
      <TestButton />
    </>
  );
}

export default Home;
