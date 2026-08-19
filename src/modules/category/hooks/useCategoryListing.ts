import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks'
import {
  categoryService,
  isAbortError,
  toCategoryError,
} from '../services/category.service'
import { DEFAULT_CATEGORY_TIME_RANGE } from '../constants/category-overview.data'
import { DEFAULT_CATEGORY_PAGE_SIZE } from '../constants/category-pagination.data'
import type {
  AsyncState,
  Category,
  CategoryError,
  CategoryId,
  CategoryOverview,
  CategoryPageSize,
  CategoryPayload,
  CategoryStatus,
  CategoryTimeRange,
} from '../types/category.types'

export interface CategoryListingController {
  search: string
  setSearch: (value: string) => void
  statusFilter: CategoryStatus | null
  setStatusFilter: (status: CategoryStatus | null) => void
  range: CategoryTimeRange
  setRange: (range: CategoryTimeRange) => void
  list: AsyncState<Category[]>
  overview: AsyncState<CategoryOverview>
  isRefreshing: boolean
  isMutating: boolean
  isFiltered: boolean
  clearFilters: () => void
  refresh: () => void
  createCategory: (payload: CategoryPayload) => Promise<CategoryError | null>
  updateCategory: (
    code: CategoryId,
    payload: CategoryPayload
  ) => Promise<CategoryError | null>
  deleteCategory: (code: CategoryId) => Promise<CategoryError | null>
  /** Client-side pagination over `list` — shared by every view that paginates. */
  page: number
  setPage: (page: number) => void
  pageSize: CategoryPageSize
  setPageSize: (pageSize: CategoryPageSize) => void
  pageCount: number
  /** Size of the current (search/status-filtered) result set. */
  totalCount: number
  /** Unfiltered master-data size — what the header subtitle shows. */
  masterCount: number
  paginatedList: AsyncState<Category[]>
}

export function useCategoryListing(): CategoryListingController {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<CategoryStatus | null>(null)
  const [range, setRange] = useState<CategoryTimeRange>(
    DEFAULT_CATEGORY_TIME_RANGE
  )
  const [reloadToken, setReloadToken] = useState(0)
  const [list, setList] = useState<AsyncState<Category[]>>({ status: 'loading' })
  const [overview, setOverview] = useState<AsyncState<CategoryOverview>>({
    status: 'loading',
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<CategoryPageSize>(
    DEFAULT_CATEGORY_PAGE_SIZE
  )
  const [masterCount, setMasterCount] = useState(0)

  const debouncedSearch = useDebouncedValue(search)

  const refresh = useCallback(() => setReloadToken((token) => token + 1), [])

  useEffect(() => {
    const controller = new AbortController()

    setIsRefreshing(true)

    categoryService
      .list({ search: debouncedSearch, status: statusFilter }, controller.signal)
      .then((categories) => {
        setList({ status: 'ready', data: categories })
        setIsRefreshing(false)
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setList({ status: 'error', error: toCategoryError(error) })
        setIsRefreshing(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, statusFilter, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    categoryService
      .overview(range, controller.signal)
      .then((data) => setOverview({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setOverview({ status: 'error', error: toCategoryError(error) })
      })

    return () => controller.abort()
  }, [range, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    categoryService
      .count(controller.signal)
      .then(setMasterCount)
      .catch((error: unknown) => {
        if (!isAbortError(error)) {
          setMasterCount(0)
        }
      })

    return () => controller.abort()
  }, [reloadToken])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, statusFilter, pageSize, reloadToken])

  const runMutation = useCallback(
    async (action: () => Promise<unknown>): Promise<CategoryError | null> => {
      setIsMutating(true)

      try {
        await action()
        refresh()

        return null
      } catch (error: unknown) {
        return toCategoryError(error)
      } finally {
        setIsMutating(false)
      }
    },
    [refresh]
  )

  const createCategory = useCallback(
    (payload: CategoryPayload) => runMutation(() => categoryService.create(payload)),
    [runMutation]
  )

  const updateCategory = useCallback(
    (code: CategoryId, payload: CategoryPayload) =>
      runMutation(() => categoryService.update(code, payload)),
    [runMutation]
  )

  const deleteCategory = useCallback(
    (code: CategoryId) => runMutation(() => categoryService.remove(code)),
    [runMutation]
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setStatusFilter(null)
  }, [])

  const totalCount = list.status === 'ready' ? list.data.length : 0
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))

  const paginatedList = useMemo<AsyncState<Category[]>>(() => {
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
    createCategory,
    updateCategory,
    deleteCategory,
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
