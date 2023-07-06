'use client';

import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  disabled?: boolean;
  children: React.ReactNode;
  handleClick?: () => void;
  isActive?: boolean;
  isHidden?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
  size?: 'xs' | 'small' | 'medium' | 'large' | 'full';
  href?: string;
  routeTo?: 'back' | 'forward';
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
        quinary: ['bg-teal'],
      },
      size: {
        xs: ['h-11', 'w-11'],
        small: ['h-11', 'w-2/5'],
        medium: ['h-11', 'w-1/2'],
        large: ['h-11', 'w-3/5'],
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
  isHidden = false,
  variant = 'primary',
  size = 'full',
  routeTo,
  ...props
}: ButtonProps) {
  const router = useRouter();
  const dynamicClasses = `${buttonClasses({ variant, size })} ${className} ${
    !isActive ? 'bg-opacity-0 opacity-50' : 'bg-opacity-100'
  }`;

  return href ? (
    <Link
      href={href}
      className={dynamicClasses + (isHidden && ' invisible')}
      style={isActive ? {} : { pointerEvents: 'none' }}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={
        routeTo === 'back'
          ? () => router.back()
          : routeTo === 'forward'
          ? () => router.forward()
          : handleClick
      }
      disabled={!isActive}
      className={dynamicClasses}
      {...props}
    >
      {children}
    </button>
  );
}
