import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks'
import {
  countryService,
  isAbortError,
  toCountryError,
} from '../services/country.service'
import { DEFAULT_COUNTRY_TIME_RANGE } from '../constants/country-overview.data'
import { DEFAULT_COUNTRY_PAGE_SIZE } from '../constants/country-pagination.data'
import type {
  AsyncState,
  Country,
  CountryError,
  CountryId,
  CountryOverview,
  CountryPageSize,
  CountryPayload,
  CountryStatus,
  CountryTimeRange,
} from '../types/country.types'

export interface CountryListingController {
  search: string
  setSearch: (value: string) => void
  statusFilter: CountryStatus | null
  setStatusFilter: (status: CountryStatus | null) => void
  range: CountryTimeRange
  setRange: (range: CountryTimeRange) => void
  list: AsyncState<Country[]>
  overview: AsyncState<CountryOverview>
  isRefreshing: boolean
  isMutating: boolean
  isFiltered: boolean
  clearFilters: () => void
  refresh: () => void
  createCountry: (payload: CountryPayload) => Promise<CountryError | null>
  updateCountry: (
    id: CountryId,
    payload: CountryPayload
  ) => Promise<CountryError | null>
  deleteCountry: (id: CountryId) => Promise<CountryError | null>
  /** Client-side pagination over `list` — shared by every view that paginates. */
  page: number
  setPage: (page: number) => void
  pageSize: CountryPageSize
  setPageSize: (pageSize: CountryPageSize) => void
  pageCount: number
  /** Size of the current (search/status-filtered) result set. */
  totalCount: number
  /** Unfiltered master-data size — what the header subtitle shows. */
  masterCount: number
  paginatedList: AsyncState<Country[]>
}

/**
 * Owns every piece of country listing state: query params, server state for the
 * list and the overview aggregates, and the mutations that invalidate both.
 * The view stays a pure function of what this returns.
 */
export function useCountryListing(): CountryListingController {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<CountryStatus | null>(null)
  const [range, setRange] = useState<CountryTimeRange>(
    DEFAULT_COUNTRY_TIME_RANGE
  )
  const [reloadToken, setReloadToken] = useState(0)
  const [list, setList] = useState<AsyncState<Country[]>>({ status: 'loading' })
  const [overview, setOverview] = useState<AsyncState<CountryOverview>>({
    status: 'loading',
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<CountryPageSize>(
    DEFAULT_COUNTRY_PAGE_SIZE
  )
  const [masterCount, setMasterCount] = useState(0)

  const debouncedSearch = useDebouncedValue(search)

  const refresh = useCallback(() => setReloadToken((token) => token + 1), [])

  useEffect(() => {
    const controller = new AbortController()

    setIsRefreshing(true)

    countryService
      .list({ search: debouncedSearch, status: statusFilter }, controller.signal)
      .then((countries) => {
        setList({ status: 'ready', data: countries })
        setIsRefreshing(false)
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setList({ status: 'error', error: toCountryError(error) })
        setIsRefreshing(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, statusFilter, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    countryService
      .overview(range, controller.signal)
      .then((data) => setOverview({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setOverview({ status: 'error', error: toCountryError(error) })
      })

    return () => controller.abort()
  }, [range, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    countryService
      .count(controller.signal)
      .then(setMasterCount)
      .catch((error: unknown) => {
        if (!isAbortError(error)) {
          setMasterCount(0)
        }
      })

    return () => controller.abort()
  }, [reloadToken])

  // A narrower result set (new search/filter/page size) can leave `page`
  // pointing past the end — snap back to the first page instead of showing blank.
  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter, pageSize, reloadToken])

  const runMutation = useCallback(
    async (action: () => Promise<unknown>): Promise<CountryError | null> => {
      setIsMutating(true)

      try {
        await action()
        refresh()

        return null
      } catch (error: unknown) {
        return toCountryError(error)
      } finally {
        setIsMutating(false)
      }
    },
    [refresh]
  )

  const createCountry = useCallback(
    (payload: CountryPayload) => runMutation(() => countryService.create(payload)),
    [runMutation]
  )

  const updateCountry = useCallback(
    (id: CountryId, payload: CountryPayload) =>
      runMutation(() => countryService.update(id, payload)),
    [runMutation]
  )

  const deleteCountry = useCallback(
    (id: CountryId) => runMutation(() => countryService.remove(id)),
    [runMutation]
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setStatusFilter(null)
  }, [])

  const totalCount = list.status === 'ready' ? list.data.length : 0
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))

  const paginatedList = useMemo<AsyncState<Country[]>>(() => {
    if (list.status !== 'ready') {
      return list
    }

    const start = (page - 1) * pageSize

    return { status: 'ready', data: list.data.slice(start, start + pageSize) }
  }, [list, page, pageSize])

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    range,
    setRange,
    list,
    overview,
    isRefreshing,
    isMutating,
    isFiltered: search.trim().length > 0 || statusFilter !== null,
    clearFilters,
    refresh,
    createCountry,
    updateCountry,
    deleteCountry,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    totalCount,
    masterCount,
    paginatedList,
  }
}
