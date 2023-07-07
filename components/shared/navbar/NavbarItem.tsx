import Link from 'next/link';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  hrefString?: string;
};

function NavbarItem({ children, hrefString }: Props) {
 
  return (
    <Link
      href={hrefString || ''}
      className="bg-yellow rounded-round shadow-shadow border-solid border-black 
      border-2 flex justify-center items-center w-14 h-11"
    >
      {children}
    </Link>
  );
}

export default NavbarItem;
