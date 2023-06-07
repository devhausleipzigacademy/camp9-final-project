'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  enable: boolean;
  children: React.ReactNode;
  bgColor: string;
  href: string;
  padding: string;
  width: string;
}

export default function Button({
  enable,
  children,
  bgColor,
  href,
  padding,
  width,
}: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(prevState => !prevState); // Toggle the isClicked state
  };

  const buttonClasses = clsx(
    'border-3 border-black rounded shadow-brutalist', // Base button styles
    bgColor,
    padding,
    width,
    {
      'bg-white': !enable && !isClicked, // Add white background if the button is disabled and not clicked
      'pointer-events-none': !enable, // Disable click events if the button is disabled
      'shadow-none': !enable, // Remove shadow if the button is disabled
      clicked: isClicked,  // Apply additional styles when the button is clicked
    }
  );

  return enable ? (
    <Link href={href} passHref>
      <button className={buttonClasses} onClick={handleClick}>
        {children}
      </button>
    </Link>
  ) : (
    <span className={buttonClasses}>{children}</span>
  );
}
