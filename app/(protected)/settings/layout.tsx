import Button from 'components/shared/buttons/Button';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container flex flex-col items-center h-screen justify-between bg-yellow-light p-8">
        <div className="mb-36 w-full flex flex-col overflow-x-hidden overflow-y-scroll items-center justify-between">
          {children}
        </div>
      </main>

      <footer className="flex container px-8 justify-between items-center bottom-28 fixed">
        <Button size="full" variant="secondary">
          <HiOutlineArrowNarrowLeft size={25} strokeWidth={2} />
          <h3>Logout</h3>
        </Button>
      </footer>
    </>
  );
}
