'use client';
import { forwardRef } from 'react';

type Input = React.InputHTMLAttributes<HTMLInputElement>;

interface Props extends Input {
  label?: string;
}

const CheckboxButton = forwardRef<HTMLInputElement, Props>(
  ({ id, label, ...props }: Props, ref) => {
    return (
      <>
        <label htmlFor={id}>
          {label && <span className="align-middle">{label}</span>}
          <input
            ref={ref}
            className="checkmarkBox"
            type="checkbox"
            id={id}
            {...props}
          />
        </label>
      </>
    );
  }
);

export default CheckboxButton;
