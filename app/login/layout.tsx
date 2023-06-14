import Button from 'components/shared/buttons/Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container flex flex-col items-center justify-between min-h-screen bg-green-light p-8">
        {children}
      </main>
    </>
  );
}
