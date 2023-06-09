import React from 'react';
import BoxChecked from './Checkbox';
import { cva } from 'class-variance-authority';

export type BoxCheckedProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  children?: any;
};

export const Questionbox = ({ variant, children }: BoxCheckedProps) => {
  const questionboxClass = cva(
    [
      'w-[300px] h-[59px] gap-2 px-2.5 shadow-shadow rounded-round flex items-center  border-solid border-black border-2',
    ],
    {
      variants: {
        variant: {
          primary: 'bg-tierblue',
          secondary: 'bg-peach',
          tertiary: 'bg-green',
        },
      },
    }
  );
  return (
    <div className={questionboxClass({ variant })}>
      {/*BoxChecked variant define the bg color for the checkbox*/}
      {/*children make reference to a tag(p,h2..) for a question*/}
      <BoxChecked variant="secondary" />
      {children}
    </div>
  );
};

export default Questionbox;
