'use client';
import NavLink from 'next/link';
import { usePathname } from 'next/navigation';

interface ButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function TabButton({ children, href }: ButtonProps) {
  const router = usePathname();
  return (
    <NavLink
      href={href}
      className={`
        bg-yellow w-18 h-11 border-3
        button-small
        border-black
        rounded
        shadow-shadow
        disabled:bg-white
        disabled:cursor-not-allowed
        disabled:opacity-50
        flex items-start justify-start p-1
        overflow-hidden
        ${router === href ? 'bg-yellow' : 'bg-white'}`}
    >
      {children}
    </NavLink>
  );
}
