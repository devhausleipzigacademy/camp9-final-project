'use client';

import { cva } from 'class-variance-authority';
import { CheckboxinputProps } from './CheckboxInput';
import { forwardRef } from 'react';

type Ref = HTMLInputElement;

export const Radio = forwardRef<Ref, CheckboxinputProps>((props, ref) => {
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
      id={props.id}
      ref={ref}
      value={props.value}
      className={boxclass({ variant: props.variant })}
    ></input>
  );
});

export default Radio;
