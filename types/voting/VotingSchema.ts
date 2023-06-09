import { z } from 'zod';

export const voteSchema = z.object({
  anonymity: z.enum(['Anonymous', 'NonAnonymous', 'AnonymousUntilQuorum']),
  answer: z.string().array().min(1),
  mood: z.enum(['Miserable', 'Unhappy', 'Unsure', 'Happy', 'Beaming']),
});

export type VotePoll = z.infer<typeof voteSchema>;
