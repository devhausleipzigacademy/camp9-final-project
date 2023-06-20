'use client';

import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  disabled?: boolean;
  children: React.ReactNode;
  handleClick?: () => void;
  isActive?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  size?: 'xs' | 'small' | 'medium' | 'large' | 'full';
  href?: string;
}

const buttonClasses = cva(
  [
    'border-3',
    'border-black',
    'button',
    'rounded',
    'shadow-shadow',
    'flex',
    'items-center',
    'gap-2',
    'justify-center',
    'disabled:bg-opacity-0',
    'disabled:cursor-not-allowed',
    'disabled:opacity-50',
    'overflow-hidden',
  ], // Base button styles
  {
    variants: {
      variant: {
        primary: ['bg-yellow'],
        secondary: ['bg-peach'],
        tertiary: ['bg-green-light'],
        quaternary: ['bg-green'],
      },
      size: {
        xs: ['h-11', 'w-11'],
        small: ['h-11', 'w-1/3'],
        medium: ['h-11', 'w-1/2'],
        large: ['h-11', 'w-2/3'],
        full: ['h-15', 'w-full'],
      },
    },
  }
);

export default function Button({
  children,
  className,
  href,
  handleClick,
  isActive = true,
  variant = 'primary',
  size = 'full',
  ...props
}: ButtonProps) {
  const dynamicClasses = `${buttonClasses({ variant, size })} ${className} ${
    !isActive ? 'bg-opacity-0' : 'bg-opacity-100'
  }`;

  return href ? (
    <Link href={href} className="w-full">
      <button className={dynamicClasses} {...props}>
        {children}
      </button>
    </Link>
  ) : (
    <button onClick={handleClick} className={dynamicClasses} {...props}>
      {children}
    </button>
  );
}
