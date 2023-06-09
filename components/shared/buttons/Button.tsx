'use client';

import Link from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';

const buttonClasses = cva(
  [
    'border-3',
    'border-black',
    'button',
    'rounded',
    'shadow-brutalist',
    'flex',
    'items-center',
    'gap-1',
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
      },
      size: {
        small: ['h-11', 'w-25'],
        medium: ['h-11', 'w-32'],
        large: ['h-11', 'w-40'],
        full: ['h-15', 'w-full'],
      },
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  disabled?: boolean;
  children: React.ReactNode;
  handleClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large' | 'full';
  href?: string;
}

export default function Button({
  children,
  className,
  href,
  handleClick,
  variant = 'primary',
  size = 'full',
  ...props
}: ButtonProps) {
  return href ? (
    <Link href={href} className="w-full">
      <button className={buttonClasses({ variant, size })} {...props}>
        {children}
      </button>
    </Link>
  ) : (
    <button
      onClick={handleClick}
      className={buttonClasses({ variant, size })}
      {...props}
    >
      {children}
    </button>
  );
}
