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
        login: ['bg-yellow', 'h-15', 'w-full', 'button'],
        logout: ['bg-peach', 'h-15', 'w-full', 'button'],
        signup: ['bg-peach', 'h-15', 'w-full', 'button'],
        next: ['bg-yellow', 'h-11', 'w-40', 'button'],
        back: ['bg-peach', 'h-11', 'w-25', 'button'],
        'date&time': ['bg-peach', 'h-11', 'w-40', 'button'],
        countdown: ['bg-peach', 'h-11', 'w-40', 'button'],
      },
    },
    defaultVariants: {
      variant: 'login',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  variant?:
    | 'login'
    | 'logout'
    | 'signup'
    | 'next'
    | 'back'
    | 'date&time'
    | 'countdown';
}

export default function Button({
  children,
  className,
  href,
  icon,
  variant,
  ...props
}: ButtonProps) {
  return href ? (
    <Link href={href} className="w-full">
      <button className={buttonClasses({ variant })} {...props}>
        {children}
      </button>
    </Link>
  ) : (
    <button className={buttonClasses({ variant })} {...props}>
      <>{children}</>
      <>{icon}</>
    </button>
  );
}
