'use client';

import { useFormContext } from 'react-hook-form';
import { VotePoll } from '@/types/voting/VotingSchema';

function VotingFeedback() {
  //this needs to be changed to a ref or Zustand
  const { register } = useFormContext<VotePoll>();

  return (
    <div className="flex flex-col flex-wrap justify-center items-center gap-2">
      <p className="description text-center">
        How do you feel about the asked question?
      </p>
      <div className="leading-[6px] pb-2">

        <div className="small-bold-feedback flex justify-center gap-1 uppercase">
          <p>Beaming,</p>
          <p>Happy,</p>
          <p>Unsure,</p>
          <p>Unhappy,</p>
          <p>Miserable.</p>
        </div>
      </div>
      <fieldset className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-row justify-between gap-4">
          <input
            id="radioButtonBeaming"
            type="radio"
            className="radioButtonBeaming"
            {...register('mood')}
            value="Beaming"
          />
          <input
            id="radioButtonHappy"
            type="radio"
            className="radioButtonHappy"
            {...register('mood')}
            value="Happy"
          />
        </div>
        <input
          id="radioButtonUnsure"
          type="radio"
          className="radioButtonUnsure"
          {...register('mood')}
          value="Unsure"
        />
        <div className="flex flex-row justify-between gap-4">
          <input
            id="radioButtonUnhappy"
            type="radio"
            className="radioButtonUnhappy"
            {...register('mood')}
            value="Unhappy"
          />
          <input
            id="radioButtonMiserable"
            type="radio"
            className="radioButtonMiserable"
            {...register('mood')}
            value="Miserable"
          />
        </div>
      </fieldset>
    </div>
  );
}

export default VotingFeedback;
