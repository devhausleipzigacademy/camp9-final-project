import PollActivityActionBar from 'components/pollActivity/PollActivityActionBar';
import { Navbar } from 'components/shared/navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-peach pt-10 pb-[104px] h-screen ">
      <PollActivityActionBar />
      <div className="overflow-y-auto mr-8 ml-7 scrollbar-left-padded max-h-[71%]">
        <div className="ml-1 mb-1 flex flex-col gap-4">{children}</div>
      </div>
    </main>
  );
}
