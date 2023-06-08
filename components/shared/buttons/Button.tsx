'use client';

import Link from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'border-3',
    'border-black',
    'rounded',
    'shadow-brutalist',
    'flex',
    'items-center',
    'justify-center',
    'disabled:bg-white',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'disable:shadow-brutalistDisabled',
  ], // Base button styles
  {
    variants: {
      variant: {
        primary: ['bg-yellow'],
        secondary: ['bg-peach'],
        tertiary: ['bg-green'],
      },
      size: {
        small: ['h-11', 'w-25'],
        medium: ['h-11', 'w-40'],
        large: ['h-15', 'w-full'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'large',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  children: React.ReactNode;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function Button({
  children,
  className,
  href,
  size,
  variant,
  ...props
}: ButtonProps) {
  return href ? (
    <Link href={href} className="w-full">
      <button className={buttonClasses({ variant, size })} {...props}>
        {children}
      </button>
    </Link>
  ) : (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}
