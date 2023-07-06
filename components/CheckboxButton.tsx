'use client';
import { forwardRef } from 'react';

type Input = React.InputHTMLAttributes<HTMLInputElement>;

interface Props extends Input {
  label: string;
  isClickable: boolean;
}

const CheckboxButton = forwardRef<HTMLInputElement, Props>(
  ({ id, label, isClickable, ...props }: Props, ref) => {
    return (
      <>
        <label htmlFor={id}>
          {isClickable ? (
            <>
              <span className="align-middle">{label}</span>
              <input
                ref={ref}
                className="checkmarkBox"
                type="checkbox"
                id={id}
                {...props}
              />
            </>
          ) : (
            <div className="w-[36px] h-[36px] bg-peach shadow-brutal border-brutal rounded-md flex items-center justify-center">
              <img
                src="/images/icons/checkSvg.svg"
                alt="checked box"
                className="items-center"
              />
            </div>
          )}
        </label>
      </>
    );
  }
);

export default CheckboxButton;
