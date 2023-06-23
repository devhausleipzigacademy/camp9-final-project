'use client';

import { cva } from 'class-variance-authority';
import { CheckboxinputProps } from './CheckboxInput';

export const Radio = ({ variant, id, name, value }: CheckboxinputProps) => {
  const boxclass = cva(['checkmarkRadio '], {
    variants: {
      variant: {
        primary: 'bg-peach',
        secondary: 'bg-teal',
        tertiary: 'bg-green',
      },
    },
  });

  return (
    <input
      type="radio"
      id={id}
      name={name}
      value={value}
      className={boxclass({ variant })}
    ></input>
  );
};

export default Radio;
