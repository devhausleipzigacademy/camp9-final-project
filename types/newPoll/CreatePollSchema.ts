import { z } from 'zod';

export const CreateNewPollSchema = z.object({
  question: z.string().min(3, 'at least 3 characters long'),

  description: z.string().optional(),
  options: z.array(z.string().min(3, 'at least 3 characters')).optional(),
  endDateTime: z.date().or(z.string()),
  anonymity: z.enum(['Anonymous', 'Non-Anonymous']).optional(),
  // quorum: z.number().int().min(0).max(100).optional(),
  quorum: z.string().refine(
    val => {
      const numericValue = +val;
      return numericValue >= 0 && numericValue <= 100;
    },
    {
      message: 'quorum must be between 0 and 100',
      path: ['quorum'],
    }
  ),
  type: z.enum(['MultipleChoice', 'SingleChoice']),
});

export type CreateNewPoll = z.infer<typeof CreateNewPollSchema>;
