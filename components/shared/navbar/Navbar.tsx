import React from 'react';
import clsx from 'clsx';
import { IoHomeSharp } from 'react-icons/io5';
import { IoIosAdd } from 'react-icons/io';
import { HiUser } from 'react-icons/hi2';
import Navbaritem from './NavbarItem';

interface NavbarProps {
  primary?: boolean;
  able?: boolean;
}
export const Navbar = ({ primary, able }: NavbarProps) => {
  return (
    <>
      <nav className="flex justify-center">
        <div
          className={clsx(
            'flex justify-around items-center w-[311px] h-[60px] rounded-round border-2 border-black border-solid shadow-shadow',
            primary ? 'bg-green' : 'bg-tierblue'
          )}
        >
          {primary === true}
          <Navbaritem>
            <IoHomeSharp className="w-8.5 h-8.5" />
          </Navbaritem>
          <Navbaritem>
            <IoIosAdd className="w-8.5 h-8.5" />
          </Navbaritem>
          <Navbaritem>
            <HiUser className="w-8.5 h-8.5" />
          </Navbaritem>
        </div>
      </nav>
    </>
  );
};
