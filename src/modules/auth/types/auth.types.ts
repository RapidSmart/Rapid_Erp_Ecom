import { z } from 'zod'
import { signInSchema } from '../validation/auth.schema'

export type SignInFormValues = z.infer<typeof signInSchema>
