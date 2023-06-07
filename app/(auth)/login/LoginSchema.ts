import { z } from 'zod';

export const LoginSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'Username be at least 5 characters long' })
    .max(50, { message: 'Username must be at most 50 characters long' }),
  password: z
    .string()
    .min(5, { message: 'Password be at least 5 characters long' })
    .max(50, { message: 'Password must be at most 50 characters long' }),
});

// the .parse method checks its argument against the schema it's called from
// -> a way to check the schema works as expected at compile time
LoginSchema.parse({ username: 'Ludwig', password: 'insecure' });

// extract the inferred type
export type LoginSchemaType = z.infer<typeof LoginSchema>;
// { username: string, password: string }
