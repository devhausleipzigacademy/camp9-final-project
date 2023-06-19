import React from 'react';
import clsx from 'clsx';
import { IoHomeSharp } from 'react-icons/io5';
import { IoIosAdd } from 'react-icons/io';
import { HiUser } from 'react-icons/hi2';
import Navbaritem from './NavbarItem';

interface NavbarProps {
  variant: 'primary' | 'secondary';
  active?: boolean;
}
export const Navbar = ({ variant = 'primary', active }: NavbarProps) => {
  
  
  
  return (
    <>
      <nav className="flex justify-center">
        <div
          className={clsx(
            'flex justify-around items-center w-[311px] h-[60px] rounded-round border-2 border-black border-solid shadow-shadow',
            variant === 'primary' ? 'bg-green' : 'bg-teal'
          )}
        >
          <Navbaritem>
            <IoHomeSharp className="w-8.5 h-8.5" />
          </Navbaritem>
          <Navbaritem>
            <IoIosAdd className="w-8.5 h-8.5" />
          </Navbaritem>
          <Navbaritem hrefString='/settings'>
            <HiUser className="w-8.5 h-8.5" />
          </Navbaritem>
        </div>
      </nav>
    </>
  );
};
