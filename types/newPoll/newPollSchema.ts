import { z } from 'zod';

export const NewPollSchema = z.object({
  question: z.string().min(3, 'at least 3 characters long'),

  description: z.string().optional(),
  options: z.array(z.string().min(3, 'at least 3 characters')).optional(),
  endDateTime: z.date().or(z.string()),
  anonymity: z.enum(['Anonymous', 'Non-Anonymous']).optional(),
  quorum: z.number().int().min(0).max(100).optional(),
  type: z.enum(['MultipleChoice', 'SingleChoice']),
});

export type NewPoll = z.infer<typeof NewPollSchema>;
