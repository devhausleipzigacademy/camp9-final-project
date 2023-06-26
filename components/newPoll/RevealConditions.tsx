'use client';
import React, { useState } from 'react';
import RadioButton from '@/components/Radiobutton';
import ConsensusController from '@/components/ConsensusController';
import { useFormContext } from 'react-hook-form';

export default function RevealConditions() {
  const { register, getValues } = useFormContext(); // retrieve all hook methods
  const [condition, setCondition] = useState({
    threshold: false,
    open: false,
    anonymous: false,
  });
  console.log(getValues());
  const onChangeCondition = (e: any) => {
    const { name } = e.target;

    if (name === 'threshold') {
      setCondition({ threshold: true, open: false, anonymous: false });
    }
    if (name === 'open') {
      setCondition({ threshold: false, open: true, anonymous: false });
    }
    if (name === 'anonymous') {
      setCondition({ threshold: false, open: false, anonymous: true });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-6 mt-5">
        <div className="flex flex-col justify-between">
          <div className="flex">
            <div className="">
              <strong>Reveal usernames</strong> for options with agreement of at
              least:
            </div>
            <div className="flex">
              <RadioButton
                name="threshold"
                id="threshold"
                value={'AnonymousUntilQuorum'}
                text="threshold"
                onChange={onChangeCondition}
                checked={condition.threshold}
              />
            </div>
          </div>
          <div className="flex mt-5">
            <ConsensusController />
          </div>
        </div>
        <div className="flex grid-flow-row justify-between">
          <div className="flex flex-col">
            <strong>Always reveal usernames</strong>(fully open)
          </div>
          <div className="flex">
            <RadioButton
              name="open"
              id="open"
              value={'NonAnonymous'}
              text="open"
              onChange={onChangeCondition}
              checked={condition.open}
            />
          </div>
        </div>
        <div className="flex grid-flow-row justify-between">
          <div className="flex flex-col">
            <strong>Never reveal usernames</strong>(fully anonymous) least:
          </div>
          <div className="flex">
            <RadioButton
              name="anonymous"
              id="anonymous"
              value={'Anonymous'}
              text="anonymous"
              onChange={onChangeCondition}
              checked={condition.anonymous}
            />
          </div>
        </div>
      </div>
    </>
  );
}
