type CheckboxinputProps = {
  variant: 'primary' | 'secondary' | 'tertiary';
};

import { cva } from 'class-variance-authority';

export const Checkboxinput = ({ variant }: CheckboxinputProps) => {
  const checkclass = cva(['checkmarkBox'], {
    variants: {
      variant: {
        primary: 'bg-peach',
        secondary: 'bg-teal',
        tertiary: 'bg-green',
      },
    },
  });

  return <input type="checkbox" className={checkclass({ variant })} />;
};
