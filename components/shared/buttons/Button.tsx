"use client"

import Link from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'border-3',
    'border-black',
    'disabled:bg-gray-400',
    'rounded',
    'shadow-brutalist',
    'p-4',
    'flex',
    'items-center',
    'justify-center',
    'disabled:bg-gray-400', // Apply a specific background color when disabled
    'disabled:cursor-not-allowed', // Apply a specific cursor style when disabled
    'disabled:opacity-50', // Apply a reduced opacity when disabled
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
      <button
        className={buttonClasses({ variant, size, className })}
        {...props}
      >
        {children}
      </button>
    </Link>
  ) : (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}
