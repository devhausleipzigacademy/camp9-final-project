import React from 'react';
import BoxChecked from './Checkbox';
import clsx from 'clsx';

export type BoxCheckedProps = {
  color?: string;
  children: any;
  onClick?: () => void;
};

export const Questionbox = ({ color, children }: BoxCheckedProps) => {
  const questionboxClass = clsx(
    'w-[300px] h-[59px] gap-1.5 px-2.5 shadow-shadow rounded-round flex items-center  border-solid border-black border-2',
    {
      'bg-tierblue': color === 'blue',
      'bg-tiergreen': color === 'green',
      'bg-peach': color === 'peach',
    }
  );
  return <div className={questionboxClass}>{children}</div>;
};

function Question() {
  return (
    <div className="flex justify-center">
      <Questionbox color="blue">
        <BoxChecked />
        <p>Lorem ipsum dolor sit amet consectetur?</p>
      </Questionbox>
    </div>
  );
}

export default Question;
