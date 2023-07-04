import React from 'react';
import { cva } from 'class-variance-authority';

export type BoxCheckedProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  children?: any;
  desabled?: boolean;
  key?: string;
};

export const Questionbox = ({
  variant,
  children,
  desabled,
  key,
}: BoxCheckedProps) => {
  const questionboxClass = cva(
    [
      'ml-1 mr-1 shadow-shadow rounded-round p-2 flex flex-row justify-start items-center border-solid border-black border-2 mb-5',
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
      <div className={questionboxClass({ variant, desabled })} key={key}>
        {children}
      </div>
    </div>
  );
};

export default Questionbox;
