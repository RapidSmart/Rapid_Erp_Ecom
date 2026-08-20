import { z } from 'zod'

export const countryFormSchema = z.object({
  countryCode: z.string().min(2, 'Country Code is required'),
  name: z.string().min(2, 'Country name is required'),
  nativeName: z.string().min(2, 'Native name is required'),
  status: z.enum(['active', 'inactive']).default('active'),
  isDefault: z.boolean().default(false),
  iso2: z.string().min(2, 'ISO2 Code must be at least 2 characters'),
  iso3: z.string().min(3, 'ISO3 Code must be at least 3 characters'),
  isoNumeric: z.string().min(1, 'ISO Numeric Code is required'),
  selectedFlag: z.string().nullable().optional(),
})

export const countryResponseSchema = countryFormSchema.extend({
  id: z.string(),
  createdAt: z.string().optional(),
})

export type CountryFormInput = z.infer<typeof countryFormSchema>
export type CountryResponse = z.infer<typeof countryResponseSchema>
