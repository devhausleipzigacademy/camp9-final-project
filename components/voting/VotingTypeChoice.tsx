import React from 'react';
import Questionbox from '../Question';
import RadioButton from '../Radiobutton';
import { useFormContext } from 'react-hook-form';
import { VotePoll } from '@/types/voting/VotingSchema';
import CheckboxButton from '../CheckboxButton';

type Props = {
  type: string;
  options: string[] | undefined;
};

function VotingTypeChoice({ type, options }: Props) {
  const { register } = useFormContext<VotePoll>();

  if (!options) return null;
  if (type === 'singleChoice') {
    return (
      <fieldset>
        <p className="small mb-2"> Multi choice, select many as you want</p>
        <div className="overflow-y-auto  h-[352px] scrollbarteal">
          {options.map(option => (
            <Questionbox variant="secondary" key={option}>
              <RadioButton
                id="singleChoice"
                {...register('answer')}
                value={option}
              />
              <p>{option}</p>
            </Questionbox>
          ))}
          <Questionbox variant="secondary">
            <RadioButton id="abstain" {...register('answer')} value="abstain" />
            <p>Abstain</p>
          </Questionbox>
        </div>
      </fieldset>
    );
  }
  return (
    <fieldset>
      <p className="small mb-2"> Multi choice, select many as you want</p>
      <div className="overflow-y-auto  h-[352px] scrollbarteal">
        {options.map(option => (
          <Questionbox variant="secondary" key={option}>
            <CheckboxButton
              id="multipleChoice"
              type="radio"
              {...register('answer')}
              value={option}
            />
            <p>{option}</p>
          </Questionbox>
        ))}
        <Questionbox variant="secondary">
          <CheckboxButton
            id="multipleChoice"
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

export default VotingTypeChoice;
