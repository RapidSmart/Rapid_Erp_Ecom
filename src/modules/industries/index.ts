import { lazy } from 'react'

export const INDUSTRIES_ROUTE_PATH = '/industries'

export const IndustriesListing = lazy(() => import('./view/IndustriesListing'))
export const IndustriesAdd = lazy(() => import('./view/IndustriesAdd'))
export const IndustriesEdit = lazy(() => import('./view/IndustriesEdit'))
