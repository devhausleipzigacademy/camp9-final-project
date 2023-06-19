import Button from 'components/shared/buttons/Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container flex flex-col items-center h-screen justify-between bg-teal p-8">
      <div className="mb-8 w-full flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
        {children}
      </div>
    </main>
  );
}
