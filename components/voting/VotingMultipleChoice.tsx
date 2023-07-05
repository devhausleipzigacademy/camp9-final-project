import clsx from 'clsx';
import React from 'react';
import CheckboxButton from '../CheckboxButton';
import Questionbox from '../Question';
import { useFormContext } from 'react-hook-form';
import { VotePoll } from '@/types/voting/VotingSchema';

function VotingMultipleChoice() {
  const { register } = useFormContext<VotePoll>();
  return (
    <fieldset>
      <p className="small mb-2"> Multi choice, select many as you want</p>
      <div className="overflow-y-auto  h-[352px] scrollbarteal">
        <Questionbox variant="secondary">
          {/* mapping through query */}
          {/* value needs to be the switch with the option of answers */}
          <CheckboxButton
            id="singleChoice"
            type="radio"
            {...register('answer')}
            value="option"
          />
          <p>Here is your question</p>
        </Questionbox>
        <Questionbox variant="secondary">
          <CheckboxButton
            id="singleChoice"
            type="radio"
            {...register('answer')}
            value="abstain"
          />
          <p>Abstain</p>
        </Questionbox>
      </div>
    </fieldset>
  );
}

export default VotingMultipleChoice;
