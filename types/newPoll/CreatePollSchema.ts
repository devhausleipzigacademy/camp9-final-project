import { z } from 'zod';

export const CreateNewPollSchema = z.object({
  question: z.string().min(3, 'at least 3 characters'),
  description: z.string().optional(),
  options: z
    .array(
      z.object({
        option: z.string().min(1, 'at least 1 character'),
      })
    )
    .min(2, 'at least 2 options'),
  endDateTime: z.date().min(new Date(), {
    message: 'Deadline must be in the future!',
  }),
  anonymity: z.enum(['Anonymous', 'NonAnonymous', 'AnonymousUntilQuorum']),
  quorum: z
    .string()
    .refine(
      val => {
        const numericValue = +val;
        return numericValue >= 0 && numericValue <= 100;
      },
      {
        message: 'quorum must be between 0 and 100',
      }
    )
    .optional(),
  participants: z.array(z.string()).min(2, 'at least 2 participants'),
  type: z.enum(['MultipleChoice', 'SingleChoice']),
});

export type CreateNewPoll = z.infer<typeof CreateNewPollSchema>;
