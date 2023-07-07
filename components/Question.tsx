import React from 'react';
import { cva } from 'class-variance-authority';

interface QuestionProps extends React.InputHTMLAttributes<HTMLDivElement> {
  variant: 'primary' | 'secondary' | 'tertiary';
  children?: any;
  desabled?: boolean;
  fixedHeight?: boolean;
}

export const Questionbox = ({
  variant,
  children,
  desabled,
  fixedHeight,
  ...props
}: QuestionProps) => {
  const questionboxClass = cva(
    [
      'ml-1 mr-[7px] shadow-shadow rounded-round p-2 flex flex-row justify-start items-center border-solid border-black border-2 mb-5',
    ],
    {
      variants: {
        variant: {
          primary: 'bg-teal',
          secondary: 'bg-peach-light',
          tertiary: 'bg-green',
        },
        desabled: {
          true: 'opacity-50',
        },
        fixedHeight: { true: 'h-[70px]' },
      },
    }
  );
  return (
    <div>
      <div
        className={questionboxClass({ variant, desabled, fixedHeight })}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default Questionbox;
