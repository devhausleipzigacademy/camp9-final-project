'use client';
import clsx from 'clsx';
import { forwardRef } from 'react';

type Input = React.InputHTMLAttributes<HTMLInputElement>;

interface Props extends Input {
  label: string;
  sublabel?: string;
  alignment: boolean;
}

const RadioButton = forwardRef<HTMLInputElement, Props>(
  ({ id, label, sublabel, alignment, ...props }: Props, ref) => {
    return (
      <>
        <div className={clsx('flex justify-between w-full items-center', alignment ? 'row' : 'row reverse')}>
          <label htmlFor={id}>
            <span className="align-middle">
              <strong>{label}</strong>
              {sublabel}
            </span>
          </label>
          <div>
            <input
              ref={ref}
              className="radio-input"
              type="radio"
              id={id}
              {...props}
            />
            <span className='custom-radio'></span>
          </div>
        </div>
      </>
    );
  }
);

export default RadioButton;
