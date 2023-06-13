import { Navbar } from 'components/shared/navbar/Navbar';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-between w-full h-full  bg-peach p-8">
      {children}
      <Navbar variant={'primary'} />
    </div>
  );
}
