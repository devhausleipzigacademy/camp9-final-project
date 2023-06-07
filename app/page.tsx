import LoginButton from '../components/LoginButton';
import SignUpButton from '../components/SignUpButton';

export default function Home() {
  return (
    <body className="px-8 flex  w-full items-center flex-col gap-2">
      <h1 className="text-3xl text-center text-yellow-900">Consensus App </h1>
      <LoginButton />
      <SignUpButton />
    </body>
  );
}
