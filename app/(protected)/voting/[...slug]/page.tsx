'use client';

import { Checkboxinput } from '@/components/CheckboxInput';
import Questionbox from '@/components/Question';
import Radio from '@/components/Radiobutton';
import { useVotePollQuery } from '@/components/hooks/usePoll';
import ProgressBar from '@/components/shared/ProgressBar';
import { PollType } from '@prisma/client';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Voting() {
  //extract the arguments from the URL
  const pathname = usePathname();
  const path = pathname.split('/');
  const [step, setStep] = useState<number>(1);

  if (path[2] === undefined || path[3] === undefined) {
    return <>Sorry</>;
  }
  const { query } = useVotePollQuery(path[2], path[3]);

  function handlePollInformation(
    type: PollType | undefined,
    options: string[] | undefined
  ) {
    if (type === 'SingleChoice') {
      return (
        <fieldset className={clsx(step === 3 ? 'visible' : 'hidden')}>
          {options?.map(option => (
            <Questionbox key={'1'} variant="secondary">
              <Radio
                variant="primary"
                id={option}
                name="option"
                value={option}
              />
              <label className="w-[228px]" htmlFor={option}>
                {option}
              </label>
            </Questionbox>
          ))}
        </fieldset>
      );
    } else if (type === 'MultipleChoice') {
      return (
        <fieldset className={clsx(step === 3 ? 'visible' : 'hidden')}>
          {options?.map(option => (
            <Questionbox key={'2'} variant="secondary">
              <Checkboxinput
                variant="primary"
                id={option}
                name="option"
                value={option}
              />
              <label className="w-[228px]" htmlFor={option}>
                {option}
              </label>
            </Questionbox>
          ))}
        </fieldset>
      );
    }
  }

  const typeofPoll = handlePollInformation(
    query.data?.data.type,
    query.data?.data.options
  );

  function headerDisplay(steps: number) {
    switch (steps) {
      case 1:
        return 'Question';
      case 2:
        return 'Voting conditions';
      case 3:
        return 'Voting';
      case 4:
        return 'Thanks for voting';
    }
  }

  const header = headerDisplay(step);

  return (
    <>
      <h1 className="title-black text-left">{header}</h1>
      <ProgressBar numberOfPages={3} currentPage={step} />

      <form>
        <legend>
          <div className="small leading-9">
            Multi choice, select many as you want
          </div>
        </legend>

        <p className={clsx(step === 1 ? 'visible' : 'hidden')}>
          {query.data?.data.description}
        </p>

        <fieldset className={clsx(step === 2 ? 'visible' : 'hidden')}>
          <div className="flex flex-row justify-between">
            <label htmlFor="anonymity">{query.data?.data.anonymity}</label>
            <input type="checkbox" id="anonymity" className="checkmarkBox" />
          </div>
        </fieldset>

        <fieldset className={clsx(step === 2 ? 'visible' : 'hidden')}>
          <div className="flex flex-row justify-between">
            <label htmlFor="quorum">
              Reveal information when {query.data?.data.quorum} participants
              reached a quorum
            </label>
            <input type="checkbox" id="quorum" className="checkmarkBox" />
          </div>
        </fieldset>
        <fieldset
          className={clsx(step === 2 ? 'visible' : 'hidden')}
        ></fieldset>
        {typeofPoll}
        <button
          type="submit"
          className={clsx(step === 3 ? 'visible' : 'hidden')}
        >
          Submit
        </button>
      </form>
      <button onClick={() => setStep(step - 1)}>Back</button>
      <button onClick={() => setStep(step + 1)}>Next</button>
    </>
  );
}
