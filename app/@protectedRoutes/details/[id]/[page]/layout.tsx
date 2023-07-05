import Button from 'components/shared/buttons/Button';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import ProgressBar from 'components/shared/ProgressBar';

export const metadata = {
  title: "d'Accord - Poll details",
};

export default function PollDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string; page: string };
}) {
  const nextPageHref = `/details/${params.id}/${parseInt(params.page) + 1}`;
  return (
    <section>
      <ProgressBar
        variant="tertiary"
        currentPage={parseInt(params.page)}
        numberOfPages={4}
      />
      {children}
      <nav className="flex justify-between container gap-12 fixed bottom-[100px] left-0 w-full px-8">
        <Button size="small" variant="secondary" routeTo="back">
          <GrFormPrevious size={24} strokeWidth={2} />
          Back
        </Button>
        <Button
          size="large"
          variant="tertiary"
          href={nextPageHref}
          isActive={params.page !== '4'}
        >
          Next page
          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </nav>
    </section>
  );
}
