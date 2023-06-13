import { Navbar } from 'components/shared/navbar/Navbar';

export default function NewPollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <footer>
        <Navbar variant={'primary'} />
      </footer>
    </>
  );
}
