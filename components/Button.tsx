import Link from 'next/link';
import clsx from 'clsx';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active: boolean;
  enable: boolean;
  children: React.ReactNode;
  className: string;
  bgColor: string;
  href: string;
  width: string;
}

export default function Button({
  active,
  enable,
  children,
  className,
  bgColor,
  href,
  width,
}: ButtonProps) {
  const buttonClasses = clsx(
    'border-3 border-black rounded shadow-brutalist w-full',
    className,
    bgColor
  );

  return (
    <Link href={href} className={width}>
      <button className={buttonClasses}>{children}</button>
    </Link>
  );
}
