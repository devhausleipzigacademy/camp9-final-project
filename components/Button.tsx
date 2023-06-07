'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  enable: boolean;
  children: React.ReactNode;
  backgroundColor: string;
  href: string;
  padding: string;
  width: string;
}

export default function Button({
  enable,
  children,
  backgroundColor = 'bg-yellow',
  href = '/',
  padding = 'p-4',
  width,
}: ButtonProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (enable) {
      setIsClicked(prevState => !prevState); // Toggle the isClicked state if the button is enabled
    }
  };

  const buttonClasses = clsx(
    'border-3 border-black rounded shadow-brutalist', // Base button styles
    (backgroundColor = !enable && !isClicked ? 'bg-white' : backgroundColor), // Add white background if the button is disabled
    padding,
    width,
    {
      'pointer-events-none': !enable, // Disable click events if the button is disabled
      'shadow-none': !enable, // Remove shadow if the button is disabled
      // Apply additional styles when the button is clicked
      'bg-black': isClicked && enable,
      'text-white': isClicked && enable,
    }
  );

  return enable ? (
    <Link href={href}>
      <button className={buttonClasses} onClick={handleClick}>
        {children}
      </button>
    </Link>
  ) : (
    // If the button is disabled, render a span instead of a button
    <span>
      <button disabled className={buttonClasses}>
        {children}
      </button>
    </span>
  );
}
