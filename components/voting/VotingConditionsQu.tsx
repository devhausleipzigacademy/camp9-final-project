import React from 'react';

import { useFormContext } from 'react-hook-form';
import { VotePoll } from '@/types/voting/VotingSchema';
import CheckboxButton from '../CheckboxButton';

interface PropsQuorum {
  anonymity: string | undefined;
  quorum: number | undefined | null;
}

function VotingConditionsQu(props: PropsQuorum) {
  const { register } = useFormContext<VotePoll>();
  return (
    <fieldset>
      <p className="small mb-6">
        <span className="small-bold">Please check</span> you understand the poll
        conditions
      </p>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="anonymity" className="body-semibold">
          Anonymity until quorum
        </label>
        <CheckboxButton
          id="anonymousuntilquorum"
          value="AnonymousUntilQuorum"
          {...register('anonymity')}
        />
      </div>
      <p className="description-light-conditions  max-w-[270px] -mt-2">
        The usernames will be revealed when {props.quorum} participants reached
        a consesus.
      </p>
    </fieldset>
  );
}

export default VotingConditionsQu;
