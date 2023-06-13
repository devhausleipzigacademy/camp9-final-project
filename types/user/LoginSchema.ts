import { z } from 'zod';

export const loginSchema = z.object({
  userName: z
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .max(20, 'Username must be less than 20 characters long.'),
  password: z.string().min(8, 'Password must be atleast 8 characters long.'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
