import React from 'react';
import Image from 'next/image';
import pencilIcon from 'public/images/icons/pencil.png';
import { type } from 'os';
import { FaPencilAlt } from 'react-icons/fa';
import { AiOutlineCheck } from 'react-icons/ai';
import clsx from 'clsx';

type Button = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface userEditProps extends Button {
  disabled: boolean;
  variant: 'pencil' | 'check';
  children: React.ReactNode;
}

function userEdit({
  disabled = false,
  variant = 'pencil',
  children,
}: userEditProps) {
  if (variant === 'pencil') {
    children = <FaPencilAlt />;
  } else if (variant === 'check') {
    children = <AiOutlineCheck />;
  }

  return (
    <div
      className={clsx(
        'border-brutal shadow-brutal rounded-md flex items-center justify-center h-[44px] w-[44px] disabled:bg-opacity-0 disabled:opacity-50 disabled:pointer-events-none',
        variant === 'pencil' ? 'bg-yellow' : 'bg-green'
      )}
    >
      {children}
    </div>
  );
}

export default userEdit;
