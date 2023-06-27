import PollActivityActionBar from 'components/pollActivity/PollActivityActionBar';
import { Navbar } from 'components/shared/navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-peach pt-10 pb-[104px] h-screen">
      <PollActivityActionBar />
      {children}
    </main>
  );
}
