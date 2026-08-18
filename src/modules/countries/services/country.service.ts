import { httpService } from '@/shared/services/http.service'
import { API_ROUTES } from '@/config/api-routes'
import {
  countryResponseSchema,
  type CountryFormInput,
  type CountryResponse,
} from '../validation/country.schema'

export const countryService = {
  createCountry: async (data: CountryFormInput): Promise<CountryResponse> => {
    const response = await httpService.post<unknown>(
      API_ROUTES.countries.create,
      data,
    )
    return countryResponseSchema.parse(response)
  },
}
