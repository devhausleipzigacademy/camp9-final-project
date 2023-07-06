'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import WarningSVG from '../public/images/WarningSVG';

type InputField = React.InputHTMLAttributes<HTMLInputElement>;

interface InputFieldProps extends InputField {
  label?: string;
  error?: {
    message?: string;
  };
  showLabel?: boolean;
}

const InputField = forwardRef(
  (
    {
      label,
      error,
      disabled,
      showLabel = true,
      required = false,
      ...props
    }: InputFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <label
        className={clsx(
          'flex flex-col w-full gap-1',
          disabled ? 'body-semibold-disabled' : 'body-semibold'
        )}
      >
        <div className="flex flex-row items-center justify-between mb-1">
          {showLabel && label}
          {error && (
            <div className="flex flex-row gap-2 items-center">
              <WarningSVG width="14px" height="14px" />{' '}
              <p className="special-accent ml-auto">{error.message}</p>
            </div>
          )}
        </div>
        <input
          className={clsx(
            'p-[14px] h-11 body rounded-md placeholder-[body-light] w-full',
            error?.message === undefined
              ? 'border-black body'
              : 'border-peach body-accent',
            disabled ? 'border-brutal-disabled' : 'border-brutal'
          )}
          ref={ref}
          {...props}
        ></input>
      </label>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
