import Button from "components/shared/buttons/Button";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container flex flex-col items-center justify-between min-h-screen bg-peach-light p-8">
        {children}
      </main>
      
      <footer className="flex w-[311px] justify-between items-center bottom-28 fixed">
        <Button size="small" variant="secondary">
          <GrFormPrevious size={24} strokeWidth={2} />
          <h3>Back</h3>
        </Button>
        <Button size="large">
          <h3>Next</h3>
          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </footer>
    </>
  );
}
