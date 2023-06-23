import React from 'react';
import { Checkboxinput } from './CheckboxInput';
import { cva } from 'class-variance-authority';

export type BoxCheckedProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  children?: any;
  desabled?: boolean;
};

export const Questionbox = ({
  variant,
  children,
  desabled,
}: BoxCheckedProps) => {
  const questionboxClass = cva(
    [
      'ml-1.5 mr-2.5 shadow-shadow rounded-round p-2 flex items-center border-solid border-black border-2 justify-around mb-5',
    ],
    {
      variants: {
        variant: {
          primary: 'bg-teal',
          secondary: 'bg-peach',
          tertiary: 'bg-green',
        },
        desabled: {
          true: 'opacity-50',
        },
      },
    }
  );
  return (
    <div>
      <div className={questionboxClass({ variant, desabled })}>{children}</div>
    </div>
  );
};

export default Questionbox;
