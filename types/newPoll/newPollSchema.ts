import { z } from 'zod';

export const NewPollSchema = z.object({
  question: z.string().min(3, 'at least 3 characters long'),
  description: z.string(),
  options: z.array(z.string()),
  endDateTime: z.date(),
  anonymity: z.enum(['Anonymous', 'Non-Anonymous']),
  quorum: z.number().int().min(0).max(100),
  type: z.enum(['MultipleChoice', 'SingleChoice', 'YesNo']),
});

export type NewPoll = z.infer<typeof NewPollSchema>;
