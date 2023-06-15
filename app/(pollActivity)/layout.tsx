import PollActivityActionBar from 'components/pollActivity/PollActivityActionBar';
import { Navbar } from 'components/shared/navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PollActivityActionBar />
      <main>{children}</main>
      <Navbar variant={'primary'} />
    </>
  );
}
