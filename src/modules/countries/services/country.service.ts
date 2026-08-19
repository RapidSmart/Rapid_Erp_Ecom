import { httpService } from '@/shared/services/http.service'
import { API_ROUTES } from '@/config/api-routes'
import {
  countryResponseSchema,
  type CountryFormInput,
  type CountryResponse,
} from '../validation/country.schema'
import { MOCK_EDIT_COUNTRY } from '../constants/mock.countries'

export const countryService = {
  createCountry: async (data: CountryFormInput): Promise<CountryResponse> => {
    const response = await httpService.post<unknown>(
      API_ROUTES.countries.create,
      data,
    )
    return countryResponseSchema.parse(response)
  },

  getCountryById: async (id: string): Promise<CountryFormInput> => {
    try {
      const response = await httpService.get<unknown>(
        API_ROUTES.countries.detail(id),
      )
      return countryResponseSchema.parse(response)
    } catch {
      // Fallback mock data for dev preview when backend API endpoint is not connected
      return { ...MOCK_EDIT_COUNTRY }
    }
  },

  updateCountry: async (
    id: string,
    data: CountryFormInput,
  ): Promise<CountryResponse> => {
    const response = await httpService.put<unknown>(
      API_ROUTES.countries.update(id),
      data,
    )
    return countryResponseSchema.parse(response)
  },
}
