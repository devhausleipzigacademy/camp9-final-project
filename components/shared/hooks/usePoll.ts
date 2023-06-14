import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Poll } from '@prisma/client';

// =====================================================================
// useGetPoll query function and hook (used in details route)
// =====================================================================
async function getPoll(id: number) {
  const response = await axios.get<Poll>(`/api/poll?id=${id}`);
  return response.data;
}

export function useGetPoll(id: number) {
  const query = useQuery({
    queryKey: ['poll', id],
    queryFn: () => getPoll(id),
  });
  return query;
}
