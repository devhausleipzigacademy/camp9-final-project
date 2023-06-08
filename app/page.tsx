'use client';

import Button from '@/components/shared/buttons/Button';

export default function Home() {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <body className="px-8 flex  w-full items-center flex-col gap-2">
      <h1 className="text-3xl text-center text-yellow-900">Consensus App </h1>
      <Button>Login ↗</Button>
      <Button>Sign up</Button>
      <Button disabled>About</Button>
      <Button onClick={handleClick} type="button">
        Form
      </Button>
    </body>
  );
}
