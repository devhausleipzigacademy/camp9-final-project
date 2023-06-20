'use client';
import NavLink from 'next/link';
import { usePathname } from 'next/navigation';

<<<<<<< HEAD
interface ButtonProps {
=======
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
>>>>>>> main
  children: React.ReactNode;
  href: string;
}

export default function TabButton({ children, href }: ButtonProps) {
  const pathname = usePathname();
  return (
    <NavLink
      href={href}
      className={`
<<<<<<< HEAD
        w-18 h-11 border-3
=======
        bg-yellow min-w-[2.75rem] h-11 border-3
>>>>>>> main
        button-small
        border-black
        rounded
       shadow-shadow
        disabled:bg-white
        disabled:cursor-not-allowed
        disabled:opacity-50
        flex items-start justify-start p-1
<<<<<<< HEAD
        overflow-hidden
        ${pathname === href ? 'bg-yellow  shadow-shadow' : 'bg-peach '}`}
=======
        overflow-hidden ${className}
        ${!isActive ? 'bg-opacity-0' : 'bg-opacity-100'}`}
      {...props}
>>>>>>> main
    >
      {children}
    </NavLink>
  );
}
