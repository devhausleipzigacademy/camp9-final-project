'use client';

import { useEffect, useRef, useState } from 'react';

function ConsensusController() {
  const [value, setValue] = useState(80);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.setProperty('background-size', `${value}%`);
    }
  }, [value]);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center">
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          list="valuesConesnusController"
          value={value}
          id="rangeValue"
          onChange={e => setValue(parseInt(e.target.value))}
          ref={inputRef}
        />

        <p>
          <output id="outputValue">{value}%</output>
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
