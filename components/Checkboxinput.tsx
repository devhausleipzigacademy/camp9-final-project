import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';

export type CheckboxinputProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
  id: string;
  type: string;
  value?: string;
  onClick: () => void;
  defaultChecked: boolean;
};

export type Ref = HTMLInputElement;

const ref = (
  { variant, type, onClick, defaultChecked }: CheckboxinputProps,
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
      onClick={onClick}
      type={type}
      className={checkclass({ variant: variant })}
      defaultChecked={defaultChecked}
    />
  );
};

export const Checkboxinput = forwardRef(ref);
