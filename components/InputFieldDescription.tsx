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
            'p-[14px] body rounded-md placeholder-[body-light] w-full  bg-green-light scrollbar',
            error?.message === undefined
              ? 'border-black body'
              : 'border-peach body-accent',
            disabled ? 'border-brutal-disabled' : ' border-3 border-dashed'
          )}
          placeholder={placeholder}
          ref={ref}
          {...props}
          disabled={disabled}
          value={props.value}
        ></textarea>
      </label>
    );
  }
);

export default InputFieldDescription;
