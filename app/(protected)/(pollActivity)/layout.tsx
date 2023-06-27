import PollActivityActionBar from 'components/pollActivity/PollActivityActionBar';
import { Navbar } from 'components/shared/navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-peach h-screen w-screen">
        <PollActivityActionBar className="h-1/3" />
        <main className="h-[52%%]">{children}</main>
        <footer className="px-8 w-[375px] container flex justify-center">
          <Navbar variant={'primary'} />
        </footer>
      </div>
    </>
  );
}
