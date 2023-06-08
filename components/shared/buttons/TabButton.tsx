'use client';

import Link from 'next/link';
import { VariantProps, cva } from 'class-variance-authority';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
}

export default function TabButton({
  children,
  className,
  href = '/',
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        console.log('clicked');
      }}
      className="w-full relative"
    >
      <button
        className="p-1 h-11 border-3
        typography-button-text
      border-black
        rounded
        shadow-brutalist
        disabled:bg-white
        disabled:cursor-not-allowed
        disabled:opacity-50

      "
        {...props}
      >
        {children}
      </button>
    </Link>
  );
}
