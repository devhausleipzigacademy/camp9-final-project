import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export type CheckboxinputProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  id: string;
  name: string;
  value: string;
};

export type Ref = HTMLInputElement;

const ref = (
  { variant, id, name, value }: CheckboxinputProps,
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
    <input
      ref={ref}
      type="checkbox"
      className={checkclass({ variant: variant })}
    />
  );
};

export const Checkboxinput = forwardRef(ref);
