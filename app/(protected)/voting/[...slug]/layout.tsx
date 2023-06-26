import { Navbar } from '@/components/shared/navbar/Navbar';
import Button from 'components/shared/buttons/Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="h-screen w-screen">
        <main className="page flex flex-col justify-between gap-5 h-full bg-[#9FCC95]">
          {children}
        </main>
        <footer className="fixed bottom-6 container px-8">
          <Navbar variant={'secondary'} />
        </footer>
      </div>
    </>
  );
}
