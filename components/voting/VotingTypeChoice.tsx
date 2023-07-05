import React from 'react';
import Questionbox from '../Question';
import RadioButton from '../Radiobutton';
import { useFormContext } from 'react-hook-form';
import { VotePoll } from '@/types/voting/VotingSchema';
import CheckboxButton from '../CheckboxButton';
import { get } from 'http';

type Props = {
  type: string;
  options: string[] | undefined;
};

function VotingTypeChoice({ type, options }: Props) {
  const { register, setValue, getValues } = useFormContext<VotePoll>();

  function handleMultipleChoice(option: string) {
    const checkForAbstain = getValues('answer');
    if (checkForAbstain && checkForAbstain.includes('abstain')) {
      const filtered = checkForAbstain.filter(item => item !== 'abstain');
      setValue('answer', [...filtered, option]);
    } else !checkForAbstain && setValue('answer', [option]);
  }
  function handleAbstainChoice() {
    const checkForAbstain = getValues('answer');
    if (checkForAbstain && !checkForAbstain.includes('abstain')) {
      setValue('answer', ['abstain']);
    }
  }

  if (!options) return null;
  if (type === 'singleChoice') {
    return (
      <fieldset>
        <h1 className="title-bold text-left pt-4 pb-4">Voting</h1>
        <p className="small mb-4">
          <span className="small-bold">Single Choice</span>, select only one
        </p>
        <div className="overflow-y-auto h-[352px] scrollbarteal">
          {options.map(option => (
            <Questionbox variant="secondary" key={option}>
              <RadioButton
                id="singleChoice"
                {...register('answer')}
                value={option}
              />
              <p key={option}>{option}</p>
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
      <h1 className="title-bold text-left pt-4 pb-4">Voting</h1>
      <p className="small mb-4">
        <span className="small-bold">Multi choice</span>, select many as you
        want
      </p>
      <div className="overflow-y-auto  h-[352px] scrollbarteal">
        {options.map(option => (
          <Questionbox variant="secondary" key={option}>
            <CheckboxButton
              id="multipleChoice"
              type="checkbox"
              {...register('answer')}
              value={option}
              onClick={() => handleMultipleChoice(option)}
            />
            <p key={option}>{option}</p>
          </Questionbox>
        ))}
        <Questionbox variant="secondary">
          <CheckboxButton
            id="multipleChoice"
            type="checkbox"
            {...register('answer')}
            value="abstain"
            onClick={handleAbstainChoice}
          />
          <p>Abstain</p>
        </Questionbox>
      </div>
    </fieldset>
  );
}

export default VotingTypeChoice;
