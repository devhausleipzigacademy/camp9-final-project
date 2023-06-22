import Button from 'components/shared/buttons/Button';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import Link from 'next/link';
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
  const prevPageHref =
    parseInt(params.page) <= 1
      ? '/'
      : `/details/${params.id}/${parseInt(params.page) - 1}`;
  const nextPageHref =
    parseInt(params.page) >= 4
      ? '/'
      : `/details/${params.id}/${parseInt(params.page) + 1}`;
  return (
    <section>
      <ProgressBar
        variant="tertiary"
        currentPage={parseInt(params.page)}
        numberOfPages={4}
      />
      {children}
      <nav className="flex justify-between container gap-12 fixed bottom-[100px] left-0 w-full px-8">
        <Button size="small" variant="secondary" href={prevPageHref}>
          <GrFormPrevious size={24} strokeWidth={2} />
          {params.page == '1' ? 'Home' : 'Back'}
        </Button>
        <Button size="large" variant="tertiary" href={nextPageHref}>
          {params.page == '4' ? 'Home' : 'Next page'}
          <GrFormNext size={24} strokeWidth={2} />
        </Button>
      </nav>
    </section>
  );
}
