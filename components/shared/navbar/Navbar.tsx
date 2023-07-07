'use client';

import React from 'react';
import clsx from 'clsx';
import { IoHomeSharp } from 'react-icons/io5';
import { IoIosAdd } from 'react-icons/io';
import { HiUser } from 'react-icons/hi2';
import Navbaritem from './NavbarItem';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  active?: boolean;
  className?: string;
}
export const Navbar = ({ active, className }: NavbarProps) => {
  const path = usePathname();
  console.log(path);
  return (
    <>
      <nav className="flex justify-center container">
        <div
          className={clsx(
            'flex justify-around items-center w-full h-[60px] rounded-round border-2 border-black border-solid shadow-shadow',
            path.includes('/vote') || path.includes('/details')
              ? 'bg-teal'
              : 'bg-green-sage'
          )}
        >
          <Navbaritem hrefString="/">
            <IoHomeSharp className="w-8.5 h-8.5" />
          </Navbaritem>
          <Navbaritem hrefString="/create">
            <IoIosAdd className="w-12 h-12" />
          </Navbaritem>
          <Navbaritem hrefString="/settings">
            <HiUser className="w-8.5 h-8.5" />
          </Navbaritem>
        </div>
      </nav>
    </>
  );
};
