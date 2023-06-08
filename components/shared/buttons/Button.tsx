'use client';

import Link from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'border-3',
    'border-black',
    'disabled:bg-gray-400',
    'rounded',
    'shadow-brutalist',
    'flex',
    'items-center',
    'justify-center',
    'disabled:bg-white', // Apply a specific background color when disabled
    'disabled:cursor-not-allowed', // Apply a specific cursor style when disabled
    'disabled:opacity-25', // Apply a reduced opacity when disabled
    'disabled:shadow-brutalistDisabled', // Remove the shadow when disabled
  ], // Base button styles
  {
    variants: {
      variant: {
        primary: ['bg-yellow'],
        secondary: ['bg-peach'],
        tertiary: ['bg-green'],
      },
      size: {
        small: ['p-2', 'w-[102px]'],
        medium: ['p-2', 'w-[158px]'],
        large: ['p-4', 'w-full'],
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
    <Link href={href} className="w-full relative">
      {/* <div
        className={`absolute border-3 -z-10 bg-white opacity-50 -translate-x-[2px] translate-y-[2px] ${buttonClasses(
          {
            variant,
            size,
            className,
          }
        )}`}
      >
        {children}
      </div> */}
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
