'use client';

import { get } from 'http';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

function ConsensusController() {
  const { getValues, register, setValue } = useFormContext(); // retrieve all hook methods

  const [valueController, setValueController] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValueController(+getValues().quorum);
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
          value={getValues().quorum}
          {...register('quorum')}
          id="rangeValue"
          onChange={e => {
            setValue('quorum', e.target.value);
            setValueController(parseInt(e.target.value));
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
