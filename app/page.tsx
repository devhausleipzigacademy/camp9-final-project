'use client';

import Button from '@/components/shared/buttons/Button';
import TabButton from '@/components/shared/buttons/TabButton';

export default function Home() {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <body className="px-8 flex  w-full items-center flex-col gap-2">
      <h1 className="text-3xl text-center text-yellow-900">Consensus App </h1>
      <Button href="/">Login ↗</Button>
      <Button>Sign up</Button>
      <Button disabled>About</Button>
      <Button onClick={handleClick} type="button" disabled>
        Form
      </Button>
      <TabButton href="/">Tab Button</TabButton>
      <TabButton disabled>asdf</TabButton>
    </body>
  );
}
