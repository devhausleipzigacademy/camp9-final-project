'use client';

import { useState } from 'react';
import { BoxCheckedProps } from './Question';
import { cva } from 'class-variance-authority';

export const Radio = ({ variant }: BoxCheckedProps) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (e: any) => {
    e.currentTarget.classList.toggle('shadow-brutal');
    setChecked(!checked);
    if (checked) {
      e.currentTarget.classList.remove('translate-y-1', '-translate-x-1');
    } else {
      e.currentTarget.classList.add('translate-y-1', '-translate-x-1');
    }
  };
  const boxclass = cva(
    [
      'w-[34px] h-[34px] flex justify-center items-center shadow-brutal rounded-round ml-4 mb-4 border-solid border-black border-2',
    ],
    {
      variants: {
        variant: {
          primary: 'bg-teal',
          secondary: 'bg-peach',
          tertiary: 'bg-green',
        },
      },
    }
  );

  return (
    <div className={boxclass({ variant })} onClick={handleChange}>
      {checked && (
        <img src='public/images/radio-fill.png'></img>
        )}
    </div>
  );
};

export default Radio;
