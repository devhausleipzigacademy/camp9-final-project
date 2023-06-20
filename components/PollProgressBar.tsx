'use client';

import React, { Ref, forwardRef, useEffect, useRef } from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
  ref: Ref<HTMLInputElement>;
}

const InputWithRef = forwardRef(({ ...props }: Props) => {
  return <input {...props} ref={props.ref} />;
});

function PollProgressBar({
  votes,
  participants,
}: {
  votes: number;
  participants: number;
}) {
  const valuePollProgression = Math.floor((votes / participants) * 100);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref?.current?.style.setProperty(
      'background-size',
      `${valuePollProgression}%`
    );
  }, [valuePollProgression]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center">
        <InputWithRef
          type="range"
          min="0"
          max="100"
          step="1"
          list="valuesPollProgression"
          value={valuePollProgression}
          id="rangeValuePollProgression"
          onChange={() => {}}
          ref={ref}
        />

        <p>
          <output id="outputValuePollProgression">
            {valuePollProgression}%
          </output>
        </p>
      </div>
      <datalist id="valuesPollProgression">
        <option value="0%" label="0%" />
        <option value="100%" label="100%" />
      </datalist>
    </div>
  );
}

export default PollProgressBar;
