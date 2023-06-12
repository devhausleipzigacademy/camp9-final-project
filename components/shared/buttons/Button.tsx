'use client';

import Link from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  disabled?: boolean;
  children: React.ReactNode;
  handleClick?: () => void;
  isActive?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large' | 'full';
  href?: string;
}

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
