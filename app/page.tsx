'use client';

import Button from 'components/shared/buttons/Button';
import TabButton from 'components/shared/buttons/TabButton';
import { useState } from 'react';

export default function Home() {
  const [tabButtonActiveA, setTabButtonActiveA] = useState(true);
  const [tabButtonActiveB, setTabButtonActiveB] = useState(false);

  const handleTabButtonClick = () => {
    setTabButtonActiveA(!tabButtonActiveA);
    setTabButtonActiveB(!tabButtonActiveB);
  };

  return (
    <>
      <h1 className="title-black text-teal bg-yellow-light">Consensus App</h1>
      <div className=" m-10 w-40 h-40 bg-teal rounded border-brutal shadow-brutal "></div>
      <Button variant="secondary">button</Button>
      <TabButton onClick={handleTabButtonClick} isActive={tabButtonActiveA}>
        tab button
      </TabButton>
      <TabButton onClick={handleTabButtonClick} isActive={tabButtonActiveB}>
        tab button B
      </TabButton>
    </>
  );
}
