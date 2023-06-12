import { z } from 'zod';

export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(3, 'Username must be at least 3 characters long.')
      .max(20, 'Username must be less than 20 characters long.'),
    password: z.string().min(8, 'Password must be atleast 8 characters long.'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be atleast 8 characters long.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type SignUpUser = z.infer<typeof signUpSchema>;
