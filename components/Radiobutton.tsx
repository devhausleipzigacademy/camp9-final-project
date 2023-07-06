'use client';
import clsx from 'clsx';
import { forwardRef } from 'react';

type Input = React.InputHTMLAttributes<HTMLInputElement>;

interface Props extends Input {
  label: string;
  sublabel?: string;
  isReverse?: boolean;
}

const RadioButton = forwardRef<HTMLInputElement, Props>(
  ({ id, label, sublabel, isReverse, ...props }: Props, ref) => {
    return (
      <>
        <label htmlFor={id}>
          {label && <span className="align-middle">{label}</span>}
          <input
            ref={ref}
            className="radio-input"
            type="radio"
            id={id}
            {...props}
          />
          <span className="custom-radio" />
        </label>
      </>
    );
  }
);

RadioButton.displayName = 'RadioButton';

export default RadioButton;
