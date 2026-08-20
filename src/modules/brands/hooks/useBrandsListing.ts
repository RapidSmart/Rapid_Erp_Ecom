import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks'
import {
  brandsService,
  isAbortError,
  toBrandError,
} from '../services/brands.service'
import { DEFAULT_BRAND_TIME_RANGE } from '../constants/brands-overview.data'
import { DEFAULT_BRAND_PAGE_SIZE } from '../constants/brands-pagination.data'
import type {
  AsyncState,
  Brand,
  BrandError,
  BrandId,
  BrandOverview,
  BrandPageSize,
  BrandPayload,
  BrandStatus,
  BrandTimeRange,
} from '../types/brands.types'

export interface BrandListingController {
  search: string
  setSearch: (value: string) => void
  statusFilter: BrandStatus | null
  setStatusFilter: (status: BrandStatus | null) => void
  range: BrandTimeRange
  setRange: (range: BrandTimeRange) => void
  list: AsyncState<Brand[]>
  overview: AsyncState<BrandOverview>
  isRefreshing: boolean
  isMutating: boolean
  isFiltered: boolean
  clearFilters: () => void
  refresh: () => void
  createBrand: (payload: BrandPayload) => Promise<BrandError | null>
  updateBrand: (
    id: BrandId,
    payload: BrandPayload
  ) => Promise<BrandError | null>
  deleteBrand: (id: BrandId) => Promise<BrandError | null>
  page: number
  setPage: (page: number) => void
  pageSize: BrandPageSize
  setPageSize: (pageSize: BrandPageSize) => void
  pageCount: number
  totalCount: number
  masterCount: number
  paginatedList: AsyncState<Brand[]>
}

export function useBrandsListing(): BrandListingController {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<BrandStatus | null>(null)
  const [range, setRange] = useState<BrandTimeRange>(DEFAULT_BRAND_TIME_RANGE)
  const [reloadToken, setReloadToken] = useState(0)
  const [list, setList] = useState<AsyncState<Brand[]>>({ status: 'loading' })
  const [overview, setOverview] = useState<AsyncState<BrandOverview>>({
    status: 'loading',
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<BrandPageSize>(DEFAULT_BRAND_PAGE_SIZE)
  const [masterCount, setMasterCount] = useState(0)

  const debouncedSearch = useDebouncedValue(search)

  const refresh = useCallback(() => setReloadToken((token) => token + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    setIsRefreshing(true)

    brandsService
      .list({ search: debouncedSearch, status: statusFilter }, controller.signal)
      .then((brands) => {
        setList({ status: 'ready', data: brands })
        setIsRefreshing(false)
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) return
        setList({ status: 'error', error: toBrandError(error) })
        setIsRefreshing(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, statusFilter, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    brandsService
      .overview(range, controller.signal)
      .then((data) => setOverview({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (isAbortError(error)) return
        setOverview({ status: 'error', error: toBrandError(error) })
      })

    return () => controller.abort()
  }, [range, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    brandsService
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
    async (action: () => Promise<unknown>): Promise<BrandError | null> => {
      setIsMutating(true)
      try {
        await action()
        refresh()
        return null
      } catch (error: unknown) {
        return toBrandError(error)
      } finally {
        setIsMutating(false)
      }
    },
    [refresh]
  )

  const createBrand = useCallback(
    (payload: BrandPayload) => runMutation(() => brandsService.create(payload)),
    [runMutation]
  )

  const updateBrand = useCallback(
    (id: BrandId, payload: BrandPayload) =>
      runMutation(() => brandsService.update(id, payload)),
    [runMutation]
  )

  const deleteBrand = useCallback(
    (id: BrandId) => runMutation(() => brandsService.remove(id)),
    [runMutation]
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setStatusFilter(null)
  }, [])

  const totalCount = list.status === 'ready' ? list.data.length : 0
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))

  const paginatedList = useMemo<AsyncState<Brand[]>>(() => {
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
    createBrand,
    updateBrand,
    deleteBrand,
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
