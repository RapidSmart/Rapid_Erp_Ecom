export const API_ROUTES = {
  auth: {
    login: '/api/v1/auth/login',
    signup: '/api/v1/auth/signup',
  },
  countries: {
    list: '/api/v1/countries',
    create: '/api/v1/countries',
    detail: (id: string) => `/api/v1/countries/${id}`,
    update: (id: string) => `/api/v1/countries/${id}`,
  },
  departments: {
    list: '/api/v1/departments',
    create: '/api/v1/departments',
    detail: (id: string) => `/api/v1/departments/${id}`,
    update: (id: string) => `/api/v1/departments/${id}`,
  },
  subCategories: {
    list: '/api/v1/sub-categories',
    create: '/api/v1/sub-categories',
    detail: (id: string) => `/api/v1/sub-categories/${id}`,
    update: (id: string) => `/api/v1/sub-categories/${id}`,
  },
} as const
