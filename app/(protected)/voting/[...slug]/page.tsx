'use client';

import CheckboxWithLabel from '@/components/CheckboxWithLabel';
import { Checkboxinput } from '@/components/Checkboxinput';
import Questionbox from '@/components/Question';
import { useVotePollQuery } from '@/components/hooks/usePoll';
import ProgressBar from '@/components/shared/ProgressBar';
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

  return (
    <>
      <h1 className="title-black text-left">Question</h1>
      <ProgressBar numberOfPages={5} currentPage={step} />
      <form>
        <legend className="body-semibold">
          Voting conditions
          <br />
          <div className="description">
            <span className="font-bold">Please check</span> you understand the
            poll conditions
          </div>
        </legend>

        <p className={clsx(step === 1 ? 'visible' : 'hidden')}>
          {query.data?.data.description}
        </p>

        <fieldset className={clsx(step === 2 ? 'visible' : 'hidden')}>
          <Questionbox variant="secondary">
            <label htmlFor="anonymity">{query.data?.data.anonymity}</label>
          </Questionbox>
        </fieldset>
        <fieldset
          className={clsx(
            step === 3 && query.data?.data.type === 'SingleChoice'
              ? 'visible'
              : 'hidden'
          )}
        >
          <div className="flex flex-col justify-between gap-12">
            <Questionbox variant="secondary">
              <label htmlFor="anonymity">{query.data?.data.anonymity}</label>
            </Questionbox>
            <Questionbox variant="secondary">
              <label htmlFor="quorum">{query.data?.data.quorum}</label>
            </Questionbox>
          </div>
        </fieldset>

        <fieldset
          className={clsx(
            step === 3 && query.data?.data.type === 'MultipleChoice'
              ? 'visible'
              : 'hidden'
          )}
        >
          <div className="flex flex-col justify-between gap-12">
            <Questionbox variant="secondary">
              <label htmlFor="anonymity">{query.data?.data.anonymity}</label>
            </Questionbox>
            <Questionbox variant="secondary">
              <label htmlFor="quorum">{query.data?.data.quorum}</label>
            </Questionbox>
          </div>
        </fieldset>

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
