'use client';
import RadioButton from '@/components/Radiobutton';
import ConsensusController from '@/components/ConsensusController';
import { CreateNewPoll } from '@/types/newPoll/CreatePollSchema';
import { useFormContext } from 'react-hook-form';

export default function RevealConditions({
  title = 'Reveal Conditions',
}: NewPollComponentProps) {
  const { getValues, setValue, unregister } = useFormContext<CreateNewPoll>(); // retrieve all hook methods

  getValues('anonymity') ?? setValue('anonymity', 'Anonymous');

  getValues('quorum');

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
                text="threshold"
                onChange={() => {
                  setValue('anonymity', 'AnonymousUntilQuorum');
                  setValue('quorum', '0');
                }}
                checked={getValues().anonymity === 'AnonymousUntilQuorum'}
              />
            </div>
          </div>
          {getValues().anonymity === 'AnonymousUntilQuorum' && (
            <div className="flex mt-5">
              <ConsensusController />
            </div>
          )}
        </div>
        <div className="flex grid-flow-row justify-between">
          <div className="flex flex-col">
            <strong>Always reveal usernames</strong>(fully open)
          </div>
          <div className="flex">
            <RadioButton
              id="open"
              text="open"
              onChange={() => {
                setValue('anonymity', 'NonAnonymous');
                unregister('quorum');
              }}
              checked={getValues().anonymity === 'NonAnonymous'}
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
              text="anonymous"
              onChange={() => {
                setValue('anonymity', 'Anonymous');
                unregister('quorum');
              }}
              checked={getValues().anonymity === 'Anonymous'}
            />
          </div>
        </div>
      </div>
    </>
  );
}
