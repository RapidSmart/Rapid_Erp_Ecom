import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks'
import {
  subCategoryService,
  isAbortError,
  toSubCategoryError,
} from '../services/sub-category.service'
import { DEFAULT_SUB_CATEGORY_TIME_RANGE } from '../constants/sub-category-overview.data'
import { DEFAULT_SUB_CATEGORY_PAGE_SIZE } from '../constants/sub-category-pagination.data'
import type {
  AsyncState,
  SubCategory,
  SubCategoryError,
  SubCategoryId,
  SubCategoryOverview,
  SubCategoryPageSize,
  SubCategoryPayload,
  SubCategoryStatus,
  SubCategoryTimeRange,
} from '../types/sub-category.types'

export interface SubCategoryListingController {
  search: string
  setSearch: (value: string) => void
  statusFilter: SubCategoryStatus | null
  setStatusFilter: (status: SubCategoryStatus | null) => void
  range: SubCategoryTimeRange
  setRange: (range: SubCategoryTimeRange) => void
  list: AsyncState<SubCategory[]>
  overview: AsyncState<SubCategoryOverview>
  isRefreshing: boolean
  isMutating: boolean
  isFiltered: boolean
  clearFilters: () => void
  refresh: () => void
  createSubCategory: (payload: SubCategoryPayload) => Promise<SubCategoryError | null>
  updateSubCategory: (
    code: SubCategoryId,
    payload: SubCategoryPayload
  ) => Promise<SubCategoryError | null>
  deleteSubCategory: (code: SubCategoryId) => Promise<SubCategoryError | null>
  page: number
  setPage: (page: number) => void
  pageSize: SubCategoryPageSize
  setPageSize: (pageSize: SubCategoryPageSize) => void
  pageCount: number
  totalCount: number
  masterCount: number
  paginatedList: AsyncState<SubCategory[]>
}

export function useSubCategoryListing(): SubCategoryListingController {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<SubCategoryStatus | null>(null)
  const [range, setRange] = useState<SubCategoryTimeRange>(
    DEFAULT_SUB_CATEGORY_TIME_RANGE
  )
  const [reloadToken, setReloadToken] = useState(0)
  const [list, setList] = useState<AsyncState<SubCategory[]>>({ status: 'loading' })
  const [overview, setOverview] = useState<AsyncState<SubCategoryOverview>>({
    status: 'loading',
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<SubCategoryPageSize>(
    DEFAULT_SUB_CATEGORY_PAGE_SIZE
  )
  const [masterCount, setMasterCount] = useState(0)

  const debouncedSearch = useDebouncedValue(search)

  const refresh = useCallback(() => setReloadToken((token) => token + 1), [])

  useEffect(() => {
    const controller = new AbortController()

    setIsRefreshing(true)

    subCategoryService
      .list({ search: debouncedSearch, status: statusFilter }, controller.signal)
      .then((subCategories) => {
        setList({ status: 'ready', data: subCategories })
        setIsRefreshing(false)
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setList({ status: 'error', error: toSubCategoryError(error) })
        setIsRefreshing(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, statusFilter, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    subCategoryService
      .overview(range, controller.signal)
      .then((data) => setOverview({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setOverview({ status: 'error', error: toSubCategoryError(error) })
      })

    return () => controller.abort()
  }, [range, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    subCategoryService
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
    async (action: () => Promise<unknown>): Promise<SubCategoryError | null> => {
      setIsMutating(true)

      try {
        await action()
        refresh()

        return null
      } catch (error: unknown) {
        return toSubCategoryError(error)
      } finally {
        setIsMutating(false)
      }
    },
    [refresh]
  )

  const createSubCategory = useCallback(
    (payload: SubCategoryPayload) => runMutation(() => subCategoryService.create(payload)),
    [runMutation]
  )

  const updateSubCategory = useCallback(
    (code: SubCategoryId, payload: SubCategoryPayload) =>
      runMutation(() => subCategoryService.update(code, payload)),
    [runMutation]
  )

  const deleteSubCategory = useCallback(
    (code: SubCategoryId) => runMutation(() => subCategoryService.remove(code)),
    [runMutation]
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setStatusFilter(null)
  }, [])

  const totalCount = list.status === 'ready' ? list.data.length : 0
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))

  const paginatedList = useMemo<AsyncState<SubCategory[]>>(() => {
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
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
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
