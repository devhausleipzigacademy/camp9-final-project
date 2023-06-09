import React from 'react';
import { VotingConditionsProps } from './VotingConditionsA';

import CheckboxButton from '../CheckboxButton';
import { useFormContext } from 'react-hook-form';
import { VotePoll } from '@/types/voting/VotingSchema';

function VotingConditionsNon(props: VotingConditionsProps) {
  const { register } = useFormContext<VotePoll>();
  return (
    <fieldset>
      <p className="small mb-6">
        <span className="small-bold">Please check</span> you understand the poll
        conditions
      </p>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor={props.anonymity} className="body-semibold">
          No Anonymity
        </label>
        <CheckboxButton
          id="nonAnonymity"
          value="NonAnonymous"
          label=''
          isClickable={true}
          {...register('anonymity')}
        />
      </div>
      <p className="description-light-conditions  max-w-[270px] -mt-2">
        The usernames and their votes will be revealed at the end of the voting
        period.
      </p>
    </fieldset>
  );
}

export default VotingConditionsNon;
