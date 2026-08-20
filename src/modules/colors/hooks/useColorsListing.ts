import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks'
import {
  colorsService,
  isAbortError,
  toColorError,
} from '../services/colors.service'
import { DEFAULT_COLOR_TIME_RANGE } from '../constants/colors-overview.data'
import { DEFAULT_COLOR_PAGE_SIZE } from '../constants/colors-pagination.data'
import type {
  AsyncState,
  Color,
  ColorError,
  ColorId,
  ColorOverview,
  ColorPageSize,
  ColorPayload,
  ColorStatus,
  ColorTimeRange,
} from '../types/colors.types'

export interface ColorListingController {
  search: string
  setSearch: (value: string) => void
  statusFilter: ColorStatus | null
  setStatusFilter: (status: ColorStatus | null) => void
  range: ColorTimeRange
  setRange: (range: ColorTimeRange) => void
  list: AsyncState<Color[]>
  overview: AsyncState<ColorOverview>
  isRefreshing: boolean
  isMutating: boolean
  isFiltered: boolean
  clearFilters: () => void
  refresh: () => void
  createColor: (payload: ColorPayload) => Promise<ColorError | null>
  updateColor: (
    id: ColorId,
    payload: ColorPayload
  ) => Promise<ColorError | null>
  deleteColor: (id: ColorId) => Promise<ColorError | null>
  page: number
  setPage: (page: number) => void
  pageSize: ColorPageSize
  setPageSize: (pageSize: ColorPageSize) => void
  pageCount: number
  totalCount: number
  masterCount: number
  paginatedList: AsyncState<Color[]>
}

export function useColorsListing(): ColorListingController {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ColorStatus | null>(null)
  const [range, setRange] = useState<ColorTimeRange>(DEFAULT_COLOR_TIME_RANGE)
  const [reloadToken, setReloadToken] = useState(0)
  const [list, setList] = useState<AsyncState<Color[]>>({ status: 'loading' })
  const [overview, setOverview] = useState<AsyncState<ColorOverview>>({
    status: 'loading',
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<ColorPageSize>(DEFAULT_COLOR_PAGE_SIZE)
  const [masterCount, setMasterCount] = useState(0)

  const debouncedSearch = useDebouncedValue(search)

  const refresh = useCallback(() => setReloadToken((token) => token + 1), [])

  useEffect(() => {
    const controller = new AbortController()
    setIsRefreshing(true)

    colorsService
      .list({ search: debouncedSearch, status: statusFilter }, controller.signal)
      .then((colors) => {
        setList({ status: 'ready', data: colors })
        setIsRefreshing(false)
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) return
        setList({ status: 'error', error: toColorError(error) })
        setIsRefreshing(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, statusFilter, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    colorsService
      .overview(range, controller.signal)
      .then((data) => setOverview({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (isAbortError(error)) return
        setOverview({ status: 'error', error: toColorError(error) })
      })

    return () => controller.abort()
  }, [range, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    colorsService
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
    async (action: () => Promise<unknown>): Promise<ColorError | null> => {
      setIsMutating(true)
      try {
        await action()
        refresh()
        return null
      } catch (error: unknown) {
        return toColorError(error)
      } finally {
        setIsMutating(false)
      }
    },
    [refresh]
  )

  const createColor = useCallback(
    (payload: ColorPayload) => runMutation(() => colorsService.create(payload)),
    [runMutation]
  )

  const updateColor = useCallback(
    (id: ColorId, payload: ColorPayload) =>
      runMutation(() => colorsService.update(id, payload)),
    [runMutation]
  )

  const deleteColor = useCallback(
    (id: ColorId) => runMutation(() => colorsService.remove(id)),
    [runMutation]
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setStatusFilter(null)
  }, [])

  const totalCount = list.status === 'ready' ? list.data.length : 0
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))

  const paginatedList = useMemo<AsyncState<Color[]>>(() => {
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
    createColor,
    updateColor,
    deleteColor,
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
