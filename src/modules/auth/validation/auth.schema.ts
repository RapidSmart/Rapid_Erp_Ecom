import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid work email.'),
  password: z.string().min(1, 'Password is required.'),
  keepSignedIn: z.boolean().optional(),
})
