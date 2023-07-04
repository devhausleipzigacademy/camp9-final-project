'use client';
import RadioButton from '@/components/Radiobutton';
import ConsensusController from '@/components/ConsensusController';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import { set, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

export default function RevealConditions() {
  const { getValues, register, setValue } = useFormContext<CreateNewPoll>(); // retrieve all hook methods
  const [showConsensusController, setShowConsensusController] = useState(false);

  useEffect(() => {
    setShowConsensusController(
      getValues().anonymity === 'AnonymousUntilQuorum'
    );
  }, [getValues]);

  return (
    <>
      <div className="pl-8 flex flex-col gap-y-6 ">
        <h3 className="title-black">Reveal Conditions</h3>
        <div className="flex flex-col justify-between">
          <div className="flex gap-2">
            <div>
              <strong>Reveal usernames</strong> for options with agreement of at
              least:
            </div>
            <div className="flex">
              <RadioButton
                id="threshold"
                value="AnonymousUntilQuorum"
                {...register('anonymity')}
                onClick={() => {
                  setShowConsensusController(true);
                }}
              />
            </div>
          </div>
          {showConsensusController && (
            <div className="flex mt-5">
              <ConsensusController />
            </div>
          )}
        </div>
        <div className="flex grid-flow-row justify-between gap-2 ">
          <div className="flex flex-col">
            <strong>Always reveal usernames</strong>(fully open)
          </div>
          <div className="flex">
            <RadioButton
              id="open"
              value="NonAnonymous"
              {...register('anonymity')}
              onClick={() => {
                setShowConsensusController(false);
                setValue('quorum', '0');
              }}
            />
          </div>
        </div>
        <div className="flex grid-flow-row justify-between">
          <div className="flex flex-col">
            <strong>Never reveal usernames</strong>(fully anonymous) least:
          </div>
          <div className="flex">
            <RadioButton
              id="anonymous"
              value="Anonymous"
              {...register('anonymity')}
              onClick={() => {
                setShowConsensusController(false);
                setValue('quorum', '0');
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
