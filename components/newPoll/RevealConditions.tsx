'use client';
import { NewPoll } from '@/types/newPoll/NewPollSchema';
import Radio from 'components/Radiobutton';
import { useFormContext } from 'react-hook-form';

export default function RevealConditions({
  title = 'Reveal Conditions',
}: NewPollComponentProps) {
  const { register, formState, getValues, setValue } =
    useFormContext<NewPoll>(); // retrieve all hook methods

  const quorum = getValues().quorum;

  const dynamicQuorum = 80;

  return (
    <>
      <fieldset className="flex flex-col font-semibold  gap-5">
        <div className="flex justify-between items-center ">
          <label className="text-black" htmlFor="revealUsernames">
            Reveal usernames
          </label>
          <input
            {...register('quorum')}
            type="radio"
            id="revealUsernames"
            value={80}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-black" htmlFor="alwaysRevealUsernames">
            Always reveal usernames
          </label>
          <input
            {...register('quorum')}
            type="radio"
            id="alwaysRevealUsernames"
            value={0}
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="text-black" htmlFor="neverRevealUsernames">
            Never reveal usernames
          </label>
          <input
            {...register('quorum')}
            type="radio"
            id="neverRevealUsernames"
            value={1000}
          />
        </div>
      </fieldset>
      {/* <div>RevealConditions</div>
      <div className="flex justify-between">
        <p className="w-[240px] row">
          <strong>Reveal usernames</strong> for options with agreement of at
          least:
        </p>
        <Radio variant={'secondary'}>Reveal</Radio>
      </div>
      <div className="flex">
        <img
          src="https://i.ibb.co/BLM88Ys/revealbar.png"
          className="mt-4 w-[356px]"
        />
      </div>
      <div className="flex justify-between mt-6">
        <p className="w-[240px] row">
          <strong>Always reveal usernames</strong> (fully open)
        </p>
        <Radio variant={'secondary'}>Reveal</Radio>
      </div>
      <div className="flex justify-between mt-4">
        <p className="w-[240px] row">
          <strong>Never reveal usernames</strong> (fully anonymous)
        </p>
        <Radio variant={'secondary'}>Reveal</Radio>
      </div> */}
    </>
  );
}
