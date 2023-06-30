import clsx from 'clsx';
import TabButton from 'components/shared/buttons/TabButton';

type PollActivityActionBarProps = {
  className?: string;
};

function PollActivityActionBar({ className }: PollActivityActionBarProps) {
  return (
    <>
      <h1 className="title-black mb-10 px-8">Poll Activity</h1>
      <nav className="flex gap-2 flex-row justify-center mb-5">
        <TabButton href="/">new</TabButton>
        <TabButton href="/pending">pending</TabButton>
        <TabButton href="/closed">closed</TabButton>
        <TabButton href="/mypolls">my polls</TabButton>
      </nav>
    </>
  );
}

export default PollActivityActionBar;
