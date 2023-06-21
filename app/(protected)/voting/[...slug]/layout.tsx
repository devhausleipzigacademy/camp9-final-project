import Button from 'components/shared/buttons/Button';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="page bg-green-light">
      <main className="flex flex-col justify-between">{children}</main>
      <footer className="flex flex-row justify-between items-center">
        <Button size="small" variant="secondary">
          <GrFormPrevious size={24} strokeWidth={2} />
          <h3>Back</h3>
        </Button>
        <Button size="large">
          <h3>Next</h3>
          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </footer>
    </div>
  );
}
