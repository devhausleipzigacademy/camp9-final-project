import { Navbar } from 'components/shared/navbar/Navbar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col items-center justify-between w-full h-full bg-peach">
        {children}
      </div>
      <footer className="absolute bottom-8">
        <Navbar variant={'primary'} />
      </footer>
    </>
  );
}
