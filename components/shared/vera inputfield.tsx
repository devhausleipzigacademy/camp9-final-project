'use client';

import React from 'react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

type InputFieldProps = {
  label: string;
  placeholder?: string;
  //max?: number; // Limit the input value to a maximum of characters (max)
  // value?: string;
  type: 'text' | 'number' | 'email' | 'password' | 'username';
  width: 'full' | 'reduced';
  error?: {
    message?: string;
  };
};

const InputField = forwardRef(
  (
    {
      //forward ref to pass input to parent (form) and pass back the error to component (inputField)
      placeholder,
      label,
      width,
      error,
    }: InputFieldProps,
    ref
  ) => {
    // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //   const inputValue = event.target.value;
    //   const truncatedValue = inputValue.slice(0, max);
    //   setValue(truncatedValue);
    // };
    return (
      <div>
        <label className="body-semibold">
          {label}
          {error && <p className="body-accent">{error.message}</p>}
          <input
            className={clsx(
              ' h-11 border border-black body rounded-md  placeholder-[body-light]',
              width === 'full' ? 'width-[311px]' : 'width-[251px]',
              error ? 'border-peach body-accent' : 'border-black body'
            )}
            placeholder={placeholder}
          ></input>
        </label>
      </div>
    );
  }
);

export default InputField;
