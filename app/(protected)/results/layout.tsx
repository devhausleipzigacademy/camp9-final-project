'use client';

import Button from 'components/shared/buttons/Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function clickNextButton() {}

  return (
    <div>
      <main className="container flex flex-col h-screen justify-between bg-peach-light p-8">
        <div className="mb-36 w-full flex flex-col justify-between">
          {children}
        </div>
      </main>

      <footer className="flex container px-8 justify-between bottom-28 fixed">
        <Button size="small" variant="secondary">
          <GrFormPrevious size={24} strokeWidth={2} />
          <h3>Back</h3>
        </Button>
        <Button size="medium" variant="tertiary" onClick={clickNextButton}>
          <h3>Next</h3>
          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </footer>
    </div>
  );
}
