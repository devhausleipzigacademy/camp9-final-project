'use client';

import { ChangeEvent } from 'react';
import { useState } from 'react';
import React from 'react';
import { clsx } from 'clsx';

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  id: string;
  max?: number; // Limit the input value to a maximum of characters (max)
  value?: string;
  type: 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url';
  width: 'full' | 'reduced';
  register?: any;
  error: Boolean;
  errormessage?: string;
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
        <p className="[#FA9A5D]">{errormessage}</p>
        <input
          className={clsx(
            'h-11 border border-black rounded-md placeholder-[#BCBCBC]',
            width === 'full' ? 'width-[311px]' : 'width-[251px]',
            error ? 'border-[#FA9A5D]' : 'border-black'
          )}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={e => (e.target.placeholder = '')}
        ></input>
      </label>
    </div>
  );
};

export default InputField;
