import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'at least 3 characters long.')
    .max(20, 'less than 20 characters long.'),
  password: z.string().min(8, 'at least 8 characters long.'),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signUpSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(8, 'at least 8 characters long.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'repeat password',
    path: ['confirmPassword'],
  });

export type SignUpUser = z.infer<typeof signUpSchema>;

export type SignUpResponse = {
  token: string;
};
