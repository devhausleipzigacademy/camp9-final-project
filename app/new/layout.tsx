import Button from 'components/shared/buttons/Button';
import TabButton from 'components/shared/buttons/TabButton';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function NewPollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
        <div className="mb-36 w-full flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
          {children}
        </div>
      </main>

      <footer className="flex container gap-8 px-8 justify-between items-center bottom-28 fixed">
        <Button size="small" variant="secondary">
          <GrFormPrevious size={24} strokeWidth={2} />
          <h3>Back</h3>
        </Button>
        <Button size="large">
          <h3>Next</h3>
          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </footer>
    </>
  );
}
