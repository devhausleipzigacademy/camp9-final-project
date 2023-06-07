import Link from 'next/link';
import clsx from 'clsx';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  active: boolean;
  children: React.ReactNode;
  className: string;
  color: string;
  href: string;
}

export default function Button({
  active,
  children,
  className,
  color,
  href,
}: ButtonProps) {
  const buttonClasses = clsx(className, color);

  return (
    <Link href={href}>
      <button className={buttonClasses}>{children}</button>
    </Link>
  );
}
