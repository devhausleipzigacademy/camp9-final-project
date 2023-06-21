'use client';

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
          <input type="checkbox" id="anonymity" />
          <label htmlFor="anonymity">Anonymity</label>
          <input type="checkbox" id="quorum" />
          <label htmlFor="quorum">Quorum</label>
        </fieldset>

        <fieldset
          className={clsx(
            step === 3 && query.data?.data.type === 'SingleChoice'
              ? 'visible'
              : 'hidden'
          )}
        >
          <input type="checkbox" id="anonymity2" />
          <label htmlFor="anonymity">Anonymity2</label>
          <input type="checkbox" id="quorum2" />
          <label htmlFor="quorum">Quorum2</label>
        </fieldset>

        <fieldset
          className={clsx(
            step === 3 && query.data?.data.type === 'MultipleChoice'
              ? 'visible'
              : 'hidden'
          )}
        >
          <input type="checkbox" id="anonymity2" />
          <label htmlFor="anonymity">Anonymity2</label>
          <input type="checkbox" id="quorum2" />
          <label htmlFor="quorum">Quorum2</label>
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
