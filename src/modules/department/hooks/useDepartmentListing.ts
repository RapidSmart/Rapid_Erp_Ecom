import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks'
import {
  departmentService,
  isAbortError,
  toDepartmentError,
} from '../services/department.service'
import { DEFAULT_DEPARTMENT_TIME_RANGE } from '../constants/department-overview.data'
import { DEFAULT_DEPARTMENT_PAGE_SIZE } from '../constants/department-pagination.data'
import type {
  AsyncState,
  Department,
  DepartmentError,
  DepartmentId,
  DepartmentOverview,
  DepartmentPageSize,
  DepartmentPayload,
  DepartmentStatus,
  DepartmentTimeRange,
} from '../types/department.types'

export interface DepartmentListingController {
  search: string
  setSearch: (value: string) => void
  statusFilter: DepartmentStatus | null
  setStatusFilter: (status: DepartmentStatus | null) => void
  range: DepartmentTimeRange
  setRange: (range: DepartmentTimeRange) => void
  list: AsyncState<Department[]>
  overview: AsyncState<DepartmentOverview>
  isRefreshing: boolean
  isMutating: boolean
  isFiltered: boolean
  clearFilters: () => void
  refresh: () => void
  createDepartment: (payload: DepartmentPayload) => Promise<DepartmentError | null>
  updateDepartment: (
    code: DepartmentId,
    payload: DepartmentPayload
  ) => Promise<DepartmentError | null>
  deleteDepartment: (code: DepartmentId) => Promise<DepartmentError | null>
  /** Client-side pagination over `list` — shared by every view that paginates. */
  page: number
  setPage: (page: number) => void
  pageSize: DepartmentPageSize
  setPageSize: (pageSize: DepartmentPageSize) => void
  pageCount: number
  /** Size of the current (search/status-filtered) result set. */
  totalCount: number
  /** Unfiltered master-data size — what the header subtitle shows. */
  masterCount: number
  paginatedList: AsyncState<Department[]>
}

export function useDepartmentListing(): DepartmentListingController {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<DepartmentStatus | null>(null)
  const [range, setRange] = useState<DepartmentTimeRange>(
    DEFAULT_DEPARTMENT_TIME_RANGE
  )
  const [reloadToken, setReloadToken] = useState(0)
  const [list, setList] = useState<AsyncState<Department[]>>({ status: 'loading' })
  const [overview, setOverview] = useState<AsyncState<DepartmentOverview>>({
    status: 'loading',
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<DepartmentPageSize>(
    DEFAULT_DEPARTMENT_PAGE_SIZE
  )
  const [masterCount, setMasterCount] = useState(0)

  const debouncedSearch = useDebouncedValue(search)

  const refresh = useCallback(() => setReloadToken((token) => token + 1), [])

  useEffect(() => {
    const controller = new AbortController()

    setIsRefreshing(true)

    departmentService
      .list({ search: debouncedSearch, status: statusFilter }, controller.signal)
      .then((departments) => {
        setList({ status: 'ready', data: departments })
        setIsRefreshing(false)
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setList({ status: 'error', error: toDepartmentError(error) })
        setIsRefreshing(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, statusFilter, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    departmentService
      .overview(range, controller.signal)
      .then((data) => setOverview({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setOverview({ status: 'error', error: toDepartmentError(error) })
      })

    return () => controller.abort()
  }, [range, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    departmentService
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
    async (action: () => Promise<unknown>): Promise<DepartmentError | null> => {
      setIsMutating(true)

      try {
        await action()
        refresh()

        return null
      } catch (error: unknown) {
        return toDepartmentError(error)
      } finally {
        setIsMutating(false)
      }
    },
    [refresh]
  )

  const createDepartment = useCallback(
    (payload: DepartmentPayload) => runMutation(() => departmentService.create(payload)),
    [runMutation]
  )

  const updateDepartment = useCallback(
    (code: DepartmentId, payload: DepartmentPayload) =>
      runMutation(() => departmentService.update(code, payload)),
    [runMutation]
  )

  const deleteDepartment = useCallback(
    (code: DepartmentId) => runMutation(() => departmentService.remove(code)),
    [runMutation]
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setStatusFilter(null)
  }, [])

  const totalCount = list.status === 'ready' ? list.data.length : 0
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))

  const paginatedList = useMemo<AsyncState<Department[]>>(() => {
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
    createDepartment,
    updateDepartment,
    deleteDepartment,
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
