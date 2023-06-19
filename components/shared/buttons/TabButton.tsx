'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  handleClick?: () => void;
  isActive: boolean;
}

export default function TabButton({
  children,
  className,
  handleClick,
  isActive = true,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={`
        bg-yellow min-w-[2.75rem] h-11 border-3
        button-small
        border-black
        rounded
        shadow-shadow
        disabled:bg-white
        disabled:cursor-not-allowed
        disabled:opacity-50
        flex items-start justify-start p-1
        overflow-hidden ${className}
        ${!isActive ? 'bg-opacity-0' : 'bg-opacity-100'}`}
      {...props}
    >
      {children}
    </button>
  );
}
