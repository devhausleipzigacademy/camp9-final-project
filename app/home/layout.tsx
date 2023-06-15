import { Navbar } from 'components/shared/navbar/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <Navbar variant={'primary'} />
    </>
  );
}
