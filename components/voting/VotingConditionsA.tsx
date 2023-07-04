'use client';

import clsx from 'clsx';
import React from 'react';
import RadioButton from '../Radiobutton';

import { VotePoll } from '@/types/voting/VotingSchema';
import { useFormContext } from 'react-hook-form';

export type VotingConditionsProps = {
  anonymity: string | undefined;
};

function VotingConditionsAnonymous(props: VotingConditionsProps) {
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
        <RadioButton id="anonymity" value="Anonymous" />
      </div>
      <p className="description-light">No username will be revealed</p>
    </fieldset>
  );
}

export default VotingConditionsAnonymous;
