import React from 'react';
import clsx from 'clsx';
import { IoHomeSharp } from 'react-icons/io5';
import { IoIosAdd } from 'react-icons/io';
import { HiUser } from 'react-icons/hi2';
import Navbaritem from './NavbarItem';

interface NavbarProps {
  variant: 'primary' | 'secondary';
  active?: boolean;
  className?: string;
}
export const Navbar = ({
  variant = 'primary',
  active,
  className,
}: NavbarProps) => {
  return (
    <>
      <nav
        className={clsx(
          'flex justify-center items-center flex-col ',
          className
        )}
      >
        <div
          className={clsx(
            'flex justify-around items-center w-[311px] h-[60px] rounded-round border-2 border-black border-solid shadow-shadow',
            variant === 'primary' ? 'bg-[#9FCC95]' : 'bg-teal'
          )}
        >
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
