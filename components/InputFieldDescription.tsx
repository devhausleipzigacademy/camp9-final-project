'use client';

import React from 'react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { ChangeEvent } from 'react';

type TextAreaProps = {
  label: string;
  showLabel: boolean;
  placeholder?: string;
  rows: number;
  maxProp?: number; // Limit the input value to a maximum of characters (max)
  value?: string;
  type: 'text' | 'number' | 'email' | 'password' | 'username';
  width: 'full' | 'reduced';
  error?: {
    message?: string;
  };
  disabled: boolean;
};

export const InputFieldDescription = forwardRef(
  (
    {
      maxProp,
      placeholder,
      label,
      width,
      rows = 4,
      error,
      disabled,
      showLabel,
      ...props
    }: TextAreaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const [value, setValue] = React.useState('');
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const inputValue = event.target.value;
      const truncatedValue = inputValue.slice(0, maxProp);
      setValue(truncatedValue);
    };

    return (
      <label
        className={clsx(
          'flex flex-col',
          disabled ? 'body-semibold-disabled' : 'body-semibold',
          width === 'full' ? 'w-full' : 'w-[251px]'
        )}
      >
        <span className={clsx(showLabel ? 'visible' : 'hidden')}>{label}</span>
        {error && <p className="body-accent ml-auto">{error.message}</p>}
        <textarea
          rows={rows}
          className={clsx(
            'p-[14px] body rounded-md placeholder-[body-light] w-full',
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
        ></textarea>
      </label>
    );
  }
);

export default InputFieldDescription;
