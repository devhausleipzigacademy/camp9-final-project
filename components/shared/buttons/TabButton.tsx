'use client';

import Link from 'next/link';

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
    <Link href={href} className="w-full relative">
      <button
        className="bg-yellow w-18 h-11 border-3
        button-small
      border-black
        rounded
        shadow-brutalist
        disabled:bg-white
        disabled:cursor-not-allowed
        disabled:opacity-50
        flex items-start justify-start p-1"
        {...props}
      >
        {children}
      </button>
    </Link>
  );
}
