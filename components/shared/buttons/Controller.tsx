'use client';

import { useEffect, useState } from 'react';

function Controller() {
  const [value, setValue] = useState(80);

  useEffect(() => {
    const rangeValue = document.getElementById('rangeValue');
    if (rangeValue) {
      rangeValue.style.setProperty('background-size', `${value}%`);
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
          list="values"
          value={value}
          id="rangeValue"
          onChange={e => setValue(parseInt(e.target.value))}
        />

        <p>
          <output id="outputValue">{value}</output>
        </p>
      </div>
      <datalist id="values">
        <option value="0%" label="0%" />
        <option value="100%" label="100%" />
      </datalist>
    </div>
  );
}

export default Controller;
