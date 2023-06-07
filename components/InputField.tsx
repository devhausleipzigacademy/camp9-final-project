'use client';

import { ChangeEvent } from 'react';
import { useState } from 'react';

type InputFieldProps = {
  label: string;
  placeholder?: string;
  id: string;
  max?: number;
  value?: string;
};

const InputField = ({ placeholder, id, label, max }: InputFieldProps) => {
  const [value, setValue] = useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Limit the input value to a maximum of characters (max)
    const truncatedValue = inputValue.slice(0, max);
    setValue(truncatedValue);
  };

  return (
    <div>
      <label>
        {label}
        <input
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        ></input>
      </label>
    </div>
  );
};

export default InputField;
