import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export type CheckboxinputProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  id: string;
  name: string;
  value: string;
  type: string;
};

export type Ref = HTMLInputElement;

const ref = (
  { variant, type }: CheckboxinputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) => {
  const checkclass = cva(['checkmarkBox'], {
    variants: {
      variant: {
        primary: 'bg-peach',
        secondary: 'bg-teal',
        tertiary: 'bg-green',
      },
    },
  });
  return (
    <input ref={ref} type={type} className={checkclass({ variant: variant })} />
  );
};

export const Checkboxinput = forwardRef(ref);
