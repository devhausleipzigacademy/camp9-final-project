import { z } from 'zod';

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .max(20, 'Username must be less than 20 characters long.'),
});
export type UsernameType = z.infer<typeof usernameSchema>;

export const passwordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long.'),
});
export type PasswordType = z.infer<typeof passwordSchema>;

export const confirmPasswordSchema = z.object({
  confirmPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters long.'),
});
export type ConfirmPasswordType = z.infer<typeof confirmPasswordSchema>;

export const loginSchema = usernameSchema.merge(passwordSchema);
export type LoginSchemaType = z.infer<typeof loginSchema>;

// "You can .extend() from a z.object(...), but not if you've added a refinement.""
// https://github.com/colinhacks/zod/discussions/694
export const signUpSchema = loginSchema
  .merge(confirmPasswordSchema)
  .refine(data => data.password === data.confirmPassword, {
    message: 'repeat password',
    path: ['confirmPassword'],
  });
export type SignUpSchema = z.infer<typeof signUpSchema>;

export type SignUpResponse = {
  token: string;
};
