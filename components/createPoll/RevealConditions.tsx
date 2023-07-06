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
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-6 mt-5 m-3">
        <h3 className="title-black">Reveal Conditions</h3>
        <div className="flex flex-col justify-between">
          <div className="flex gap-2">
            <RadioButton
              id="threshold"
              value="AnonymousUntilQuorum"
              label="Reveal usernames "
              sublabel="for options with agreement of at least:"
              isReverse={false}
              {...register('anonymity')}
              onClick={() => {
                setShowConsensusController(true);
              }}
            />
          </div>
          {showConsensusController && (
            <div className="flex mt-5">
              <ConsensusController />
            </div>
          )}
        </div>
        <div className="flex grid-flow-row justify-between gap-2 ">
          <RadioButton
            id="open"
            value="NonAnonymous"
            label="Always reveal usernames"
            sublabel=" (fully open)"
            isReverse={false}
            {...register('anonymity')}
            onClick={() => {
              setShowConsensusController(false);
              setValue('quorum', '0');
            }}
          />
        </div>
        <div className="flex grid-flow-row justify-between">
          {/* flex flex col */}
          <RadioButton
            id="anonymous"
            value="Anonymous"
            isReverse={false}
            label="Never reveal usernames"
            sublabel=" (fully anonymous)"
            {...register('anonymity')}
            onClick={() => {
              setShowConsensusController(false);
              setValue('quorum', '0');
            }}
          />
        </div>
      </div>
    </>
  );
}
