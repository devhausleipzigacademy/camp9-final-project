import { z } from 'zod';

/////////////////////
// atomic schemata //
/////////////////////

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, '3 characters or more')
    .max(20, '20 characters or less'),
});
export type UsernameType = z.infer<typeof usernameSchema>;

export const passwordSchema = z.object({
  password: z.string().min(8, '8 characters or more'),
});
export type PasswordType = z.infer<typeof passwordSchema>;

export const confirmPasswordSchema = z.object({
  confirmPassword: z
    .string()
    .min(8, '8 characters or more'),
});
export type ConfirmPasswordType = z.infer<typeof confirmPasswordSchema>;

export type SignUpResponse = {
  token: string;
};

///////////////////////
// compound schemata //
///////////////////////

// "You can .extend() from a z.object(...), but not if you've added a refinement.""
// https://github.com/colinhacks/zod/discussions/694

export const loginSchema = usernameSchema.merge(passwordSchema);
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signUpSchema = loginSchema
  .merge(confirmPasswordSchema)
  .refine(data => data.password === data.confirmPassword, {
    message: 'repeat password',
    path: ['confirmPassword'],
  });
export type SignUpSchema = z.infer<typeof signUpSchema>;

export const settingsPasswordSchema = passwordSchema
  .merge(confirmPasswordSchema)
  .refine(data => data.password === data.confirmPassword, {
    message: 'repeat password',
    path: ['confirmPassword'],
  });
export type SettingsPasswordType = z.infer<typeof settingsPasswordSchema>;
