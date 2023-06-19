import Link from 'next/link';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  hrefString?: string;
};

function NavbarItem({ children, hrefString }: Props) {
  // if chilren = IoHomeSharp, then hrefString = '/'
  // if chilren = IoIosAdd, then hrefString = '/add'
  // if children = HiUser, then hrefString = '/settings'

  return (
    <Link
      href={hrefString || ''}
      className="bg-yellow rounded-round shadow-shadow border-solid border-black border-2 flex justify-center items-center w-14 h-11"
    >
      {children}
    </Link>
  );
}

export default NavbarItem;
