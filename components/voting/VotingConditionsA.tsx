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
      <p className="small">
        <span className="small-bold">Please check</span> you understand the poll
        conditions
      </p>
      <div className="flex flex-row justify-between">
        <label htmlFor={props.anonymity} className="body-semibold">
          Full anonymity
        </label>
        <CheckboxButton
          id="anonymity"
          value="Anonymous"
          {...register('anonymity')}
        />
      </div>
      <p className="description-light">No username will be revealed</p>
    </fieldset>
  );
}

export default VotingConditionsAnonymous;
