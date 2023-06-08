'use client';

import { ChangeEvent } from 'react';
import { useState } from 'react';
import React from 'react';

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  id: string;
  max?: number; // Limit the input value to a maximum of characters (max)
  value?: string;
  type: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url';
  width: 'full' | 'reduced';
  abled: 'true' | 'false';
  register?: any;
};

export const InputField = ({
  placeholder,
  id,
  label,
  max,
}: InputFieldProps) => {
  const [value, setValue] = useState('');
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const truncatedValue = inputValue.slice(0, max);
    setValue(truncatedValue);
  };

  return (
    <div>
      <label>
        {label}
        <input
          className="h-11  {width:311px} border border-black rounded-md placeholder-#BCBCBC "
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
