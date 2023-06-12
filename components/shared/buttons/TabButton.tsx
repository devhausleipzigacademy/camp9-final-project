'use client';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  handleClick?: () => void;
  isActive: boolean;
}

export default function TabButton({
  children,
  className,
  handleClick,
  isActive = true,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={`
        bg-yellow w-18 h-11 border-3
        button-small
        border-black
        rounded
        shadow-brutalist
        disabled:bg-white
        disabled:cursor-not-allowed
        disabled:opacity-50
        flex items-start justify-start p-1
        overflow-hidden
        ${!isActive ? 'bg-opacity-0' : 'bg-opacity-100'}`}
      {...props}
    >
      {children}
    </button>
  );
}
