import { z } from 'zod';

export const NewPollSchema = z.object({
  question: z.string().min(3, 'at least 3 characters long'),
  description: z.string(),
  options: z.array(z.string().min(1, 'at least 1 character long')),
  endDateTime: z.date(),
  anonymity: z.enum(['Anonymous', 'Non-Anonymous']),
  quorum: z.number(),
  type: z.enum(['MultipleChoice', 'YesNo', 'RankedChoice']),
});

export type NewPoll = z.infer<typeof NewPollSchema>;
