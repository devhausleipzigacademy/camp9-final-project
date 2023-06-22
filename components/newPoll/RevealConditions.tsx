'use client';
import React, { useState } from 'react';
import RadioButton from '@/components/Radiobutton';
import { useFormContext } from 'react-hook-form';

export default function RevealConditions() {
  const { register } = useFormContext(); // retrieve all hook methods
  const [condition, setCondition] = useState({
    threshold: false,
    open: false,
    anonymous: false,
  });

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
      <div>RevealConditions</div>
      <div className="flex flex-col gap-y-6">
        <div className="flex grid-flow-row justify-between">
          <div className="">
            <strong>Reveal usernames</strong> for options with agreement of at
            least:
          </div>
          <div className="flex">
            <RadioButton
              {...register('condition')}
              name="open"
              id="open"
              value="open"
              text="open"
              onChange={onChangeCondition}
              checked={condition.open}
            />
          </div>
        </div>
        <div className="flex grid-flow-row justify-between">
          <div className="flex flex-col">
            <strong>Always reveal usernames</strong>(fully open)
          </div>
          <div className="flex">
            <RadioButton
              {...register('condition')}
              name="threshold"
              id="threshold"
              value="threshold"
              text="threshold"
              onChange={onChangeCondition}
              checked={condition.threshold}
            />
          </div>
        </div>
        <div className="flex grid-flow-row justify-between">
          <div className="flex flex-col">
            <strong>Never reveal usernames</strong>(fully anonymous)
            least:
          </div>
          <div className="flex">
            <RadioButton
              {...register('condition')}
              name="anonymous"
              id="anonymous"
              value="anonymous"
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
