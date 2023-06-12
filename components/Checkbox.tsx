'use client';

import { useState } from 'react';
import { BoxCheckedProps } from './Question';
import { cva } from 'class-variance-authority';

export const Box = ({ variant }: BoxCheckedProps) => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };
  const boxclass = cva(
    [
      'w-[34px] h-[34px] flex justify-center items-center shadow-shadow rounded-round border-solid border-black border-2',
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
      {checked ? (
        <svg
          className="w-10 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="6" fill="#FEBF10" />
          <path
            d="M5.33333 2C3.47693 2 2 3.47693 2 5.33333V18.6667C2 20.5231 3.47693 22 5.33333 22H18.6667C20.5231 22 22 20.5231 22 18.6667V7.2381L21.0476 8.33929V18.6667C21.0476 20.0004 20.0004 21.0476 18.6667 21.0476H5.33333C3.99963 21.0476 2.95238 20.0004 2.95238 18.6667V5.33333C2.95238 3.99963 3.99963 2.95238 5.33333 2.95238H17.9077L18.6667 2H5.33333ZM20.6905 3.78571L11.4792 14.6488L7.61012 11.0327L6.95536 11.7321L11.1964 15.6756L11.5685 16.0179L11.881 15.6458L21.4048 4.39583L20.6905 3.78571Z"
            fill="black"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      ) : (
        <svg
          className="w-10 h-6"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.33333 1C2.47693 1 1 2.47693 1 4.33333V17.6667C1 19.5231 2.47693 21 4.33333 21H17.6667C19.5231 21 21 19.5231 21 17.6667V6.23809L20.0476 7.33929V17.6667C20.0476 19.0004 19.0004 20.0476 17.6667 20.0476H4.33333C2.99963 20.0476 1.95238 19.0004 1.95238 17.6667V4.33333C1.95238 2.99963 2.99963 1.95238 4.33333 1.95238H16.9077L17.6667 1H4.33333Z"
            fill="black"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  );
};

export default Box;
