import clsx from 'clsx';
import React from 'react';

function VotingMultipleChoice() {
  return (
    <fieldset className={clsx(step === 3 ? 'visible' : 'hidden')}>
      <p className="small mb-2"> Multi choice, select many as you want</p>
      <div className="overflow-y-auto  h-[352px] scrollbarteal">
        {options?.map(option => (
          <div
            key={option}
            className={clsx(
              'bg-peach rounded-round p-2 mr-2 mb-5 border-solid border-black border-2 flex flex-row justify-between items-center ',
              abstain ? 'opacity-50' : 'visible'
            )}
          >
            <input
              type="checkbox"
              {...register(`multipleChoice[${option}]`)}
              className="checkmarkBox"
              disabled={abstain}
            />
            <label className="w-[228px]" htmlFor={option}>
              {option}
            </label>
          </div>
        ))}

        <div className="bg-peach rounded-round p-2 mr-2 mb-5 items-center border-solid border-black border-2 flex flex-row justify-between ">
          <input
            type="checkbox"
            {...register('abstain')}
            className="checkmarkBox"
          />
          <label className="w-[228px]" htmlFor="abstain">
            Abstain
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default VotingMultipleChoice;
