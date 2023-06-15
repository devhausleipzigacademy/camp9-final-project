'use client';

import React from 'react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { ChangeEvent } from 'react';

type InputFieldProps = {
  label: string;
  showLabel: boolean;
  placeholder?: string;
  maxProp?: number; // Limit the input value to a maximum of characters (max)
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
      maxProp,
      placeholder,
      label,
      width,
      error,
      disabled,
      showLabel,
      ...props
    }: InputFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [value, setValue] = React.useState('');
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        <div className="flex flex-row items-center justify-between mb-1">
          <span className={clsx(showLabel ? 'visible' : 'hidden')}>
            {label}
          </span>
          {error && (
            <div className="flex flex-row gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="14px"
                height="14px"
              >
                {' '}
                <path d="M 15 3 C 14.168432 3 13.456063 3.5067238 13.154297 4.2285156 L 2.3007812 22.947266 L 2.3007812 22.949219 A 2 2 0 0 0 2 24 A 2 2 0 0 0 4 26 A 2 2 0 0 0 4.140625 25.994141 L 4.1445312 26 L 15 26 L 25.855469 26 L 25.859375 25.992188 A 2 2 0 0 0 26 26 A 2 2 0 0 0 28 24 A 2 2 0 0 0 27.699219 22.947266 L 27.683594 22.919922 A 2 2 0 0 0 27.681641 22.917969 L 16.845703 4.2285156 C 16.543937 3.5067238 15.831568 3 15 3 z M 13.787109 11.359375 L 16.212891 11.359375 L 16.011719 17.832031 L 13.988281 17.832031 L 13.787109 11.359375 z M 15.003906 19.810547 C 15.825906 19.810547 16.318359 20.252813 16.318359 21.007812 C 16.318359 21.748812 15.825906 22.189453 15.003906 22.189453 C 14.175906 22.189453 13.679688 21.748813 13.679688 21.007812 C 13.679688 20.252813 14.174906 19.810547 15.003906 19.810547 z" />
              </svg>{' '}
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
