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
        <label
          className={clsx(
            'flex items-center justify-between w-full',
            isReverse ? 'flex-row-reverse' : 'flex-row'
          )}
        >
          <span className="align-middle w-[180-px]">
            <p className="body-semibold inline">{label}</p>
            {sublabel && (
              <>
                <br />
                <p className="description-light">{sublabel}</p>
              </>
            )}
          </span>
          <div>
            <input ref={ref} className="radio-input" type="radio" {...props} />
            <span className="custom-radio" />
          </div>
        </label>
      </>
    );
  }
);

export default RadioButton;
