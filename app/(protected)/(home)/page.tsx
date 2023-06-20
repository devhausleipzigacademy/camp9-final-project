import ConsensusController from 'components/ConsensusController';
import PollProgressBar from 'components/PollProgressBar';

export default function Home() {
  return (
    <>
      <h1 className="title-black">Poll Activity</h1>
      <ConsensusController />
      <PollProgressBar votes={2} participants={90} />
    </>
  );
}
