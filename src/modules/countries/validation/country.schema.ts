import { z } from 'zod'

export const countryFormSchema = z.object({
  isoCode: z.string().min(2, 'ISO code must be at least 2 characters'),
  countryName: z.string().min(2, 'Country name is required'),
  diallingCode: z.string().min(1, 'Dialling code is required'),
  continent: z.string().min(1, 'Continent selection is required'),
  currency: z.string().min(1, 'Currency selection is required'),
  status: z.enum(['active', 'inactive']).default('active'),
  defaultCountry: z.string().optional(),
  selectedFlag: z.string().nullable().optional(),
  internalNote: z.string().optional(),
})

export const countryResponseSchema = countryFormSchema.extend({
  id: z.string(),
  createdAt: z.string().optional(),
})

export type CountryFormInput = z.infer<typeof countryFormSchema>
export type CountryResponse = z.infer<typeof countryResponseSchema>
