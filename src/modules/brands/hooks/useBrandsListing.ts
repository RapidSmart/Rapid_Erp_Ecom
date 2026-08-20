import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks'
import {
  industriesService,
  isAbortError,
  toIndustryError,
} from '../services/industries.service'
import { DEFAULT_INDUSTRY_TIME_RANGE } from '../constants/industries-overview.data'
import { DEFAULT_INDUSTRY_PAGE_SIZE } from '../constants/industries-pagination.data'
import type {
  AsyncState,
  Industry,
  IndustryError,
  IndustryId,
  IndustryOverview,
  IndustryPageSize,
  IndustryPayload,
  IndustryStatus,
  IndustryTimeRange,
} from '../types/industries.types'

export interface IndustryListingController {
  search: string
  setSearch: (value: string) => void
  statusFilter: IndustryStatus | null
  setStatusFilter: (status: IndustryStatus | null) => void
  range: IndustryTimeRange
  setRange: (range: IndustryTimeRange) => void
  list: AsyncState<Industry[]>
  overview: AsyncState<IndustryOverview>
  isRefreshing: boolean
  isMutating: boolean
  isFiltered: boolean
  clearFilters: () => void
  refresh: () => void
  createIndustry: (payload: IndustryPayload) => Promise<IndustryError | null>
  updateIndustry: (
    id: IndustryId,
    payload: IndustryPayload
  ) => Promise<IndustryError | null>
  deleteIndustry: (id: IndustryId) => Promise<IndustryError | null>
  page: number
  setPage: (page: number) => void
  pageSize: IndustryPageSize
  setPageSize: (pageSize: IndustryPageSize) => void
  pageCount: number
  totalCount: number
  masterCount: number
  paginatedList: AsyncState<Industry[]>
}

export function useIndustriesListing(): IndustryListingController {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<IndustryStatus | null>(null)
  const [range, setRange] = useState<IndustryTimeRange>(DEFAULT_INDUSTRY_TIME_RANGE)
  const [reloadToken, setReloadToken] = useState(0)
  const [list, setList] = useState<AsyncState<Industry[]>>({ status: 'loading' })
  const [overview, setOverview] = useState<AsyncState<IndustryOverview>>({
    status: 'loading',
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<IndustryPageSize>(DEFAULT_INDUSTRY_PAGE_SIZE)
  const [masterCount, setMasterCount] = useState(0)

  const debouncedSearch = useDebouncedValue(search)

  const refresh = useCallback(() => setReloadToken((token) => token + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    setIsRefreshing(true)

    industriesService
      .list({ search: debouncedSearch, status: statusFilter }, controller.signal)
      .then((industries) => {
        setList({ status: 'ready', data: industries })
        setIsRefreshing(false)
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) return
        setList({ status: 'error', error: toIndustryError(error) })
        setIsRefreshing(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, statusFilter, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    industriesService
      .overview(range, controller.signal)
      .then((data) => setOverview({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (isAbortError(error)) return
        setOverview({ status: 'error', error: toIndustryError(error) })
      })

    return () => controller.abort()
  }, [range, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    industriesService
      .count(controller.signal)
      .then(setMasterCount)
      .catch((error: unknown) => {
        if (!isAbortError(error)) setMasterCount(0)
      })

    return () => controller.abort()
  }, [reloadToken])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter, pageSize, reloadToken])

  const runMutation = useCallback(
    async (action: () => Promise<unknown>): Promise<IndustryError | null> => {
      setIsMutating(true)
      try {
        await action()
        refresh()
        return null
      } catch (error: unknown) {
        return toIndustryError(error)
      } finally {
        setIsMutating(false)
      }
    },
    [refresh]
  )

  const createIndustry = useCallback(
    (payload: IndustryPayload) => runMutation(() => industriesService.create(payload)),
    [runMutation]
  )

  const updateIndustry = useCallback(
    (id: IndustryId, payload: IndustryPayload) =>
      runMutation(() => industriesService.update(id, payload)),
    [runMutation]
  )

  const deleteIndustry = useCallback(
    (id: IndustryId) => runMutation(() => industriesService.remove(id)),
    [runMutation]
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setStatusFilter(null)
  }, [])

  const totalCount = list.status === 'ready' ? list.data.length : 0
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))

  const paginatedList = useMemo<AsyncState<Industry[]>>(() => {
    if (list.status !== 'ready') return list
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
    createIndustry,
    updateIndustry,
    deleteIndustry,
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
