import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks'
import {
  productService,
  isAbortError,
  toProductError,
} from '../services/product.service'
import { DEFAULT_PRODUCT_TIME_RANGE } from '../constants/product-overview.data'
import { DEFAULT_PRODUCT_PAGE_SIZE } from '../constants/product-pagination.data'
import type {
  AsyncState,
  Product,
  ProductError,
  ProductId,
  ProductOverview,
  ProductPageSize,
  ProductPayload,
  ProductStatus,
  ProductTimeRange,
  ProductListingController,
} from '../types/product.types'


/**
 * Owns every piece of product listing state: query params, server state for the
 * list and the overview aggregates, and the mutations that invalidate both.
 * The view stays a pure function of what this returns.
 */
export function useProductListing(): ProductListingController {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProductStatus | null>(null)
  const [range, setRange] = useState<ProductTimeRange>(
    DEFAULT_PRODUCT_TIME_RANGE
  )
  const [reloadToken, setReloadToken] = useState(0)
  const [list, setList] = useState<AsyncState<Product[]>>({ status: 'loading' })
  const [overview, setOverview] = useState<AsyncState<ProductOverview>>({
    status: 'loading',
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMutating, setIsMutating] = useState(false)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<ProductPageSize>(
    DEFAULT_PRODUCT_PAGE_SIZE
  )
  const [masterCount, setMasterCount] = useState(0)

  const debouncedSearch = useDebouncedValue(search)

  const refresh = useCallback(() => setReloadToken((token) => token + 1), [])

  useEffect(() => {
    const controller = new AbortController()

    setIsRefreshing(true)

    productService
      .list({ search: debouncedSearch, status: statusFilter }, controller.signal)
      .then((products) => {
        setList({ status: 'ready', data: products })
        setIsRefreshing(false)
      })
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setList({ status: 'error', error: toProductError(error) })
        setIsRefreshing(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, statusFilter, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    productService
      .overview(range, controller.signal)
      .then((data) => setOverview({ status: 'ready', data }))
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return
        }

        setOverview({ status: 'error', error: toProductError(error) })
      })

    return () => controller.abort()
  }, [range, reloadToken])

  useEffect(() => {
    const controller = new AbortController()

    productService
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
    async (action: () => Promise<unknown>): Promise<ProductError | null> => {
      setIsMutating(true)

      try {
        await action()
        refresh()

        return null
      } catch (error: unknown) {
        return toProductError(error)
      } finally {
        setIsMutating(false)
      }
    },
    [refresh]
  )

  const createProduct = useCallback(
    (payload: ProductPayload) => runMutation(() => productService.create(payload)),
    [runMutation]
  )

  const updateProduct = useCallback(
    (id: ProductId, payload: ProductPayload) =>
      runMutation(() => productService.update(id, payload)),
    [runMutation]
  )

  const deleteProduct = useCallback(
    (id: ProductId) => runMutation(() => productService.remove(id)),
    [runMutation]
  )

  const clearFilters = useCallback(() => {
    setSearch('')
    setStatusFilter(null)
  }, [])

  const totalCount = list.status === 'ready' ? list.data.length : 0
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))

  const paginatedList = useMemo<AsyncState<Product[]>>(() => {
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
    createProduct,
    updateProduct,
    deleteProduct,
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
