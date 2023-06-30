'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

function ConsensusController() {
  const { setValue, getValues } = useFormContext(); // retrieve all hook methods

  const [valueController, setValueController] = useState(getValues('quorum'));

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.setProperty(
        'background-size',
        `${valueController}%`
      );
    }
  }, [valueController]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center">
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          list="valuesConesnusController"
          value={valueController}
          id="rangeValue"
          onChange={e => {
            setValueController(parseInt(e.target.value));
            setValue('quorum', e.target.value);
          }}
          ref={inputRef}
        />

        <p>
          <output id="outputValue">{valueController}%</output>
        </p>
      </div>
      <datalist id="valuesConesnusController">
        <option value="0%" label="0%" />
        <option value="100%" label="100%" />
      </datalist>
    </div>
  );
}

export default ConsensusController;
