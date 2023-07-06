'use client';

import React from 'react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';

type TextArea = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

interface TextAreaProps extends TextArea {
  label: string;
  error?: {
    message?: string;
  };
}

export const InputFieldDescription = forwardRef(
  (
    { label, error, disabled, ...props }: TextAreaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <label
        className={clsx(
          'flex flex-col gap-1',
          disabled ? 'body-semibold-disabled' : 'body-semibold'
        )}
      >
        <span className={clsx(label ? 'visible' : 'hidden')}>{label}</span>
        {error && <p className="body-accent ml-auto">{error.message}</p>}
        <textarea
          className={clsx(
            'p-[14px] body rounded-md placeholder-[body-light] w-full  bg-green-light scrollbar',
            error?.message === undefined
              ? 'border-black body'
              : 'border-peach body-accent',
            disabled ? 'border-brutal-disabled' : ' border-3 border-dashed'
          )}
          ref={ref}
          {...props}
        ></textarea>
      </label>
    );
  }
);

InputFieldDescription.displayName = 'InputFieldDescription';

export default InputFieldDescription;
