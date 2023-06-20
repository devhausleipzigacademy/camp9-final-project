'use client';

import React, { useEffect } from 'react';

function PollProgressBar({
  votes,
  participants,
}: {
  votes: number;
  participants: number;
}) {
  const valuePollProgression = Math.floor((votes / participants) * 100);

  useEffect(() => {
    const rangeValue = document.getElementById('rangeValuePollProgression');
    if (rangeValue) {
      rangeValue.style.setProperty(
        'background-size',
        `${valuePollProgression}%`
      );
    }
  }, [valuePollProgression]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          list="valuesPollProgression"
          value={valuePollProgression}
          id="rangeValuePollProgression"
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
