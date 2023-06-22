import { z } from 'zod';

export const CreateNewPollSchema = z.object({
  question: z.string().min(3, 'at least 3 characters long'),
  description: z.string().optional(),
  options: z.array(z.string().min(3, 'at least 3 characters')),
  endDateTime: z.date().or(z.string()),
  anonymity: z.enum(['Anonymous', 'NonAnonymous']),
  quorum: z.string().refine(
    val => {
      const numericValue = +val;
      return numericValue >= 0 && numericValue <= 100;
    },
    {
      message: 'quorum must be between 0 and 100',
    }
  ),
  type: z.enum(['MultipleChoice', 'SingleChoice']),
});

export type CreateNewPoll = z.infer<typeof CreateNewPollSchema>;
