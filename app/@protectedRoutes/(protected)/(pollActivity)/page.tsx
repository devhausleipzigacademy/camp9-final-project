import PollActivityCards from '@/components/pollActivity/PollActivityCards';
import { authOptions } from '@/libs/auth';
import { getNewPolls } from '@/services/getPolls';
import { getServerSession } from 'next-auth';

async function NewPolls() {
  const session = await getServerSession(authOptions);
  const polls = await getNewPolls();
  return (
    <PollActivityCards polls={polls} userId={session?.user.id!} type="new" />
  );
}
export default NewPolls;
