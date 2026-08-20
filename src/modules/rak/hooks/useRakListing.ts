import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks'
import {
  rakService,
  isAbortError,
  toRakError,
} from '../services/rak.service'
import { DEFAULT_RAK_TIME_RANGE } from '../constants/rak-overview.data'
import { DEFAULT_RAK_PAGE_SIZE } from '../constants/rak-pagination.data'
import type {
  AsyncState,
  Rak,
  RakError,
  RakId,
  RakOverview,
  RakPageSize,
  RakPayload,
  RakStatus,
  RakTimeRange,
} from '../types/rak.types'

export interface RakListingController {
  search: string
  setSearch: (value: string) => void
  statusFilter: RakStatus | null
  setStatusFilter: (status: RakStatus | null) => void
  range: RakTimeRange
  setRange: (range: RakTimeRange) => void
  list: AsyncState<Rak[]>
  overview: AsyncState<RakOverview>
  isRefreshing: boolean
  isMutating: boolean
  isFiltered: boolean
  clearFilters: () => void
  refresh: () => void
  createRak: (payload: RakPayload) => Promise<RakError | null>
  updateRak: (
    id: RakId,
    payload: RakPayload
  ) => Promise<RakError | null>
  deleteRak: (id: RakId) => Promise<RakError | null>
  page: number
  setPage: (page: number) => void
  pageSize: RakPageSize
  setPageSize: (pageSize: RakPageSize) => void
  pageCount: number
  totalCount: number
  masterCount: number
  paginatedList: AsyncState<Rak[]>
}

export function useRakListing(): RakListingController {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<RakStatus | null>(null)
  const [range, setRange] = useState<RakTimeRange>(DEFAULT_RAK_TIME_RANGE)
  const [reloadToken, setReloadToken] = useState(0)
  const [list, setList] = useState<AsyncState<Rak[]>>({ status: 'loading' })
  const [overview, setOverview] = useState<AsyncState<RakOverview>>({
    status: 'loading',
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<RakPageSize>(DEFAULT_RAK_PAGE_SIZE)
  const [masterCount, setMasterCount] = useState(0)

  const debouncedSearch = useDebouncedValue(search)

  const refresh = useCallback(() => setReloadToken((token) => token + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    setIsRefreshing(true)

    rakService
      .list({ search: debouncedSearch, status: statusFilter }, controller.signal)
      .then((rak) => {
        setList({ status: 'ready', data: rak })
        setIsRefreshing(false)
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) return
        setList({ status: 'error', error: toRakError(error) })
        setIsRefreshing(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, statusFilter, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    rakService
      .overview(range, controller.signal)
      .then((data) => setOverview({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (isAbortError(error)) return
        setOverview({ status: 'error', error: toRakError(error) })
      })

    return () => controller.abort()
  }, [range, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    rakService
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
    async (action: () => Promise<unknown>): Promise<RakError | null> => {
      setIsMutating(true)
      try {
        await action()
        refresh()
        return null
      } catch (error: unknown) {
        return toRakError(error)
      } finally {
        setIsMutating(false)
      }
    },
    [refresh]
  )

  const createRak = useCallback(
    (payload: RakPayload) => runMutation(() => rakService.create(payload)),
    [runMutation]
  )

  const updateRak = useCallback(
    (id: RakId, payload: RakPayload) =>
      runMutation(() => rakService.update(id, payload)),
    [runMutation]
  )

  const deleteRak = useCallback(
    (id: RakId) => runMutation(() => rakService.remove(id)),
    [runMutation]
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setStatusFilter(null)
  }, [])

  const totalCount = list.status === 'ready' ? list.data.length : 0
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))

  const paginatedList = useMemo<AsyncState<Rak[]>>(() => {
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
    createRak,
    updateRak,
    deleteRak,
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
