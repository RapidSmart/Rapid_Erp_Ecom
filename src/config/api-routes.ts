export const API_ROUTES = {
  auth: {
    login: '/api/v1/auth/login',
    signup: '/api/v1/auth/signup',
  },
  countries: {
    list: '/api/v1/countries',
    create: '/api/v1/countries',
    detail: (id: string) => `/api/v1/countries/${id}`,
  },
} as const
