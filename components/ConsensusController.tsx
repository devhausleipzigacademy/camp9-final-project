'use client';

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from 'react';
import { useFormContext } from 'react-hook-form';

// We need to wrap component in `forwardRef` in order to gain
// access to the ref object that is assigned using the `ref` prop.
// This ref is passed as the second parameter to the function component.

const ConsensusController = forwardRef((props, ref) => {
  const [valueController, setValueController] = useState(0);
  const [visible, setVisible] = useState('');
  const { setValue } = useFormContext(); // retrieve all hook methods

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.setProperty(
        'background-size',
        `${valueController}%`
      );
    }
  }, [valueController]);

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument

  useImperativeHandle(ref, () => ({
    handleVisible(e: any) {
      if (e == true) {
        setVisible('w-full');
        setValueController(0);
        setValue('quorum', '0')
      }
      if (e == false) {
        setVisible('hidden');
        setValueController(0);
      }
    },
  }));

  return (
    <div className={visible || 'hidden'}>
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
});

export default ConsensusController;
