import { Poll, Vote } from '@prisma/client';

export interface ExtendedPoll extends Poll {
  votes: Vote[];
  _count: {
    participants: number;
    votes: number;
  };
}
