'use client';
import React, { useState, useRef } from 'react';
import RadioButton from '@/components/Radiobutton';
import ConsensusController from '@/components/ConsensusController';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import { useFormContext } from 'react-hook-form';

export default function RevealConditions({
  title = 'Reveal Conditions',
}: NewPollComponentProps) {
  const { getValues, setValue } = useFormContext<CreateNewPoll>(); // retrieve all hook methods
  const childRef: any = useRef();
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
      childRef.current.handleVisible(true);
    }
    if (name === 'open') {
      setCondition({ threshold: false, open: true, anonymous: false });
      childRef.current.handleVisible(false);
      setValue('quorum', '0');
    }
    if (name === 'anonymous') {
      setCondition({ threshold: false, open: false, anonymous: true });
      childRef.current.handleVisible(false);
      setValue('quorum', '100');
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
            <ConsensusController ref={childRef} />
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
