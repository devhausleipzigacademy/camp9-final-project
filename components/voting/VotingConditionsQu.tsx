'use client';
import clsx from 'clsx';
import React from 'react';
import RadioButton from '../Radiobutton';
import { useFormContext } from 'react-hook-form';
import { VotePoll } from '@/types/voting/VotingSchema';

interface PropsQuorum {
  anonymity: string | undefined;
  quorum: number | undefined | null;
}

function VotingConditionsQu(props: PropsQuorum) {
  return (
    <fieldset>
      <p className="small">
        <span className="small-bold">Please check</span> you understand the poll
        conditions
      </p>
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="anonymity" className="body-semibold">
          Anonymity until quorum
        </label>
        <RadioButton id="anonymousuntilquorum" value="AnonymousUntilQuorum" />
      </div>
      <p className="description-light max-w-[270px]">
        The usernames will be revealed when {props.quorum} participants reached
        a consesus.
      </p>
    </fieldset>
  );
}

export default VotingConditionsQu;
