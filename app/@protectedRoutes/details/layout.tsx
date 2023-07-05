import Button from 'components/shared/buttons/Button';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import Link from 'next/link';
import ProgressBar from 'components/shared/ProgressBar';

export const metadata = {
  title: "d'Accord - Poll details",
};

export default function PollDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-8 py-10 bg-yellow h-[667px]">
      <h1 className="title-black mb-1">Poll Details</h1>
      {children}
    </main>
  );
}
