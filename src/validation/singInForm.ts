import { z } from 'zod';

export const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(5, {
    message: 'Password must be at least 5 characters',
  }),
});

export type SignInFormSchema = z.infer<typeof formSchema>;
