import Link from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'border-3',
    'border-black',
    'rounded',
    'shadow-brutalist',
    'p-4',
    'flex',
    'items-center',
    'justify-center',
  ], // Base button styles
  {
    variants: {
      variant: {
        primary: ['bg-yellow', 'hover:bg-yellow-light'],
        secondary: ['bg-peach', 'hover:bg-peach-light'],
        tertiary: ['bg-green', 'hover:bg-green-light'],
      },
      size: {
        small: ['w-fit-content'],
        medium: ['w-1/2'],
        large: ['w-full'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  children: React.ReactNode;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function Button({
  children,
  className,
  href = '/',
  size,
  variant,
  ...props
}: ButtonProps) {
  return href ? (
    <Link
      href={href}
      className={buttonClasses({ variant, size, className })}
      children={children}
    />
  ) : (
    <button className={buttonClasses({ variant, size, className })}>
      {children}
    </button>
  );
}
