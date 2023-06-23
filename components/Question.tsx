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
      'w-[285px] ml-[5px] shadow-shadow rounded-round p-2 flex items-center border-solid border-black border-2 justify-around mb-5',
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
    <div className={questionboxClass({ variant, desabled })}>{children}</div>
  );
};

export default Questionbox;
