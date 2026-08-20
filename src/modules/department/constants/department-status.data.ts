import type { DepartmentStatus } from '../types/department.types'

export interface DepartmentStatusOption {
  value: DepartmentStatus
  labelKey: string
}

export const DEPARTMENT_STATUS_OPTIONS: readonly DepartmentStatusOption[] = [
  { value: 'active', labelKey: 'department.status.active' },
  { value: 'inactive', labelKey: 'department.status.inactive' },
  { value: 'draft', labelKey: 'department.status.draft' },
  { value: 'delete', labelKey: 'department.status.delete' },
]

export const DEFAULT_DEPARTMENT_STATUS: DepartmentStatus = 'active'
