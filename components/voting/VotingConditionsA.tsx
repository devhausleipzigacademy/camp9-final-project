import React from 'react';
import RadioButton from '../Radiobutton';

import { VotePoll } from '@/types/voting/VotingSchema';
import { useFormContext } from 'react-hook-form';
import CheckboxButton from '../CheckboxButton';

export type VotingConditionsProps = {
  anonymity: string | undefined;
};

function VotingConditionsAnonymous(props: VotingConditionsProps) {
  const { register } = useFormContext<VotePoll>();

  return (
    <fieldset>
      <p className="small mb-6">
        <span className="small-bold">Please check</span> you understand the poll
        conditions
      </p>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor={props.anonymity} className="body-semibold">
          Full anonymity
        </label>
        <CheckboxButton
          id="anonymity"
          value="Anonymous"
          label=''
          isClickable={true}
          {...register('anonymity')}
        />
      </div>
      <p className="description-light-conditions  max-w-[270px] -mt-2">
        No username will be revealed
      </p>
    </fieldset>
  );
}

export default VotingConditionsAnonymous;
