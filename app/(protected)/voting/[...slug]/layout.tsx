import Button from 'components/shared/buttons/Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page bg-[#9FCC95]">
      <main className="flex flex-col justify-between h-full">{children}</main>
    </div>
  );
}
