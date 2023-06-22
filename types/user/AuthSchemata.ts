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

export const confirmPasswordSchema = passwordSchema
  .extend({
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long.'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'repeat password',
    path: ['confirmPassword'],
  });
export type ConfirmPasswordType = z.infer<typeof confirmPasswordSchema>;

export const loginSchema = usernameSchema.merge(passwordSchema);
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signUpSchema = usernameSchema.merge(
  confirmPasswordSchema.innerType() // <-- innerType fix https://stackoverflow.com/a/74672929
);
export type SignUpUser = z.infer<typeof signUpSchema>;

export type SignUpResponse = {
  token: string;
};
