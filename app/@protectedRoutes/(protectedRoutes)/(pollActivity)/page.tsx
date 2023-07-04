import PollActivityCards from '@/components/pollActivity/PollActivityCards';
import { getNewPolls } from '@/services/getPolls';

async function NewPolls() {
  const polls = await getNewPolls();
  return <PollActivityCards polls={polls} />;
}
export default NewPolls;
