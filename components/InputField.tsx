'use client';

import React from 'react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import WarningSVG from '../public/images/WarningSVG';

type InputField = React.InputHTMLAttributes<HTMLInputElement>;

interface InputFieldProps extends InputField {
  label?: string;
  width: 'full' | 'reduced';
  error?: {
    message?: string;
  };
}

const InputField = forwardRef(
  (
    {
      placeholder,
      label,
      width,
      error,
      disabled,
      required = false,
      ...props
    }: InputFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <label
        className={clsx(
          'flex flex-col',
          disabled ? 'body-semibold-disabled' : 'body-semibold',
          width === 'full' ? 'w-full' : 'w-[251px]'
        )}
      >
        <div className="flex flex-row items-center justify-between mb-1">
          {label && <span>{label}</span>}
          {error && (
            <div className="flex flex-row gap-2 items-center">
              <WarningSVG width="14px" height="14px" />{' '}
              <p className="special-accent ml-auto">{error.message}</p>
            </div>
          )}
        </div>
        <input
          {...props}
          className={clsx(
            'p-[14px] h-11 body rounded-md placeholder-[body-light] w-full',
            error?.message === undefined
              ? 'border-black body'
              : 'border-peach body-accent',
            disabled ? 'border-brutal-disabled' : 'border-brutal'
          )}
          ref={ref}
        ></input>
      </label>
    );
  }
);

export default InputField;
