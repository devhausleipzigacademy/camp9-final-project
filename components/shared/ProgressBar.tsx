import { cva } from 'class-variance-authority';

interface ProgressBarProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  currentPage: number;
  numberOfPages: number;
}

export default function ProgressBar({
  variant = 'primary',
  currentPage = 1,
  numberOfPages = 5,
}: ProgressBarProps) {
  // Enforce currentPage to be within the valid range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > numberOfPages) {
    currentPage = numberOfPages;
  } else if (numberOfPages === 1) {
    currentPage = 1;
  }

  // Enforce numberOfPages to be a positive number
  if (numberOfPages < 1) {
    numberOfPages = 1;
  }

  // determine width of progress bar using % values
  const width =
    currentPage === numberOfPages
      ? '100%'
      : `${(100 / numberOfPages) * currentPage}%`;

  // set up class variance authority
  const progressBarClasses = cva(['z-10', 'border-2', 'absolute', 'top-0'], {
    variants: {
      variant: {
        primary: ['border-yellow'],
        secondary: ['border-peach'],
        tertiary: ['border-green-light'],
      },
    },
  });

  // get classes for progress bar
  const classes = progressBarClasses({ variant });

  return (
    <div className="flex flex-col gap-2 small">
      <div className="flex justify-between items-center w-full">
        <h3>Progress</h3>
        <p>{`page ${currentPage} of ${numberOfPages}`}</p>
      </div>
      <div className="relative">
        <hr className="border-2 border-black" />
        <hr className={classes} style={{ width }} />
      </div>
    </div>
  );
}
