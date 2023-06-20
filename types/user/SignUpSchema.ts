import { z } from 'zod';

export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(3, 'atleast 3 characters long')
      .max(20, 'less than 20 characters long.'),
    password: z.string().min(8, 'atleast 8 characters long'),
    confirmPassword: z.string().min(8, 'do not match'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'repeat password',
    path: ['confirmPassword'],
  });

export type SignUpUser = z.infer<typeof signUpSchema>;
