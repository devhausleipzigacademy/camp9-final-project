import { Poll, User, Vote } from '@prisma/client';

export interface ExtendedPoll extends Poll {
  votes: Vote[];
  participants: User[];
  _count: {
    participants: number;
    votes: number;
  };
}
