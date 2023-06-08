'use client';

import Button from '@/components/shared/buttons/Button';
import TabButton from '@/components/shared/buttons/TabButton';

export default function Home() {
  const handleClick = () => {
    console.log('clicked');
  };
  return (
    <>
      <h1 className="title-black text-teal bg-yellow-light">Consensus App</h1>
      <div className=" m-10 w-40 h-40 bg-teal rounded border-brutal shadow-brutal "></div>
    </>
  );
}
