import { z } from 'zod';

export const voteSchema = z.object({
  anonymity: z.boolean(),
  answer: z.array(z.boolean()),
  mood: z.enum(['Miserable', 'Unhappy', 'Unsure', 'Happy', 'Beaming']),
});
