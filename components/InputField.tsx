'use client';

import React from 'react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { ChangeEvent } from 'react';

type InputFieldProps = {
  label: string;
  placeholder?: string;
  max?: number; // Limit the input value to a maximum of characters (max)
  value?: string;
  type: 'text' | 'number' | 'email' | 'password' | 'username';
  width: 'full' | 'reduced';
  error?: {
    message?: string;
  };
  disabled: boolean;
};

export const InputField = forwardRef(
  (
    {
      max,
      placeholder,
      label,
      width,
      error,
      disabled,
      ...props
    }: InputFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [value, setValue] = React.useState('');
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const truncatedValue = inputValue.slice(0, max);
      setValue(truncatedValue);
    };

    return (
      <label
        className={clsx(
          'flex flex-col',
          disabled ? 'body-semibold-disabled' : 'body-semibold',
          width === 'full' ? 'w-[311px]' : 'w-[251px]'
        )}
      >
        <span>{label}</span>
        {error && <p className="body-accent ml-auto">{error.message}</p>}
        <input
          className={clsx(
            'p-[14px] h-11 body rounded-md placeholder-[body-light] w-full',
            error?.message === undefined
              ? 'border-black body'
              : 'border-peach body-accent',
            disabled ? 'border-brutal-disabled' : 'border-brutal'
          )}
          placeholder={placeholder}
          ref={ref}
          {...props}
          disabled={disabled}
          onChange={handleChange}
          value={value}
        ></input>
      </label>
    );
  }
);

export default InputField;
