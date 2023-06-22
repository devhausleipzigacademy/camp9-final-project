import React from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { IoMdCheckmark } from 'react-icons/io';
import clsx from 'clsx';

type Button = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface settingsButtonProps extends Button {
  disabled: boolean;
  variant: 'pencil' | 'check';
  children: React.ReactNode;
  onClick: () => void;
}

function SettingsButton({
  disabled = false,
  variant = 'pencil',
  children,
  onClick,
}: settingsButtonProps) {
  if (variant === 'pencil') {
    children = <RiPencilFill className="w-6 h-6" />;
  } else if (variant === 'check') {
    children = <IoMdCheckmark className="w-6 h-6" />;
  }

  return (
    <button
      className={clsx(
        'border-brutal shadow-brutal rounded-md flex items-center justify-center h-[44px] w-[44px] mt-5',
        variant === 'pencil' ? 'bg-yellow' : 'bg-green',
        disabled && 'bg-opacity-0 opacity-50 pointer-events-none'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default SettingsButton;
