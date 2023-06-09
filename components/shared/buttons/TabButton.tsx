interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  handleClick?: () => void;
  inactive?: boolean; // New prop to indicate if the tab is active
}

export default function TabButton({
  children,
  className,
  handleClick,
  inactive,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={
        `
        bg-yellow w-18 h-11 border-3
        button-small
        border-black
        rounded
        shadow-brutalist
        disabled:bg-white
        disabled:cursor-not-allowed
        disabled:opacity-50
        flex items-start justify-start p-1
        ${inactive ? 'bg-transparent' : ''}` // Add conditional class for active style
      }
      {...props}
    >
      {children}
    </button>
  );
}
