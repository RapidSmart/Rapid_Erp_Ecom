import {
  LayoutGrid,
  BarChart3,
  Globe,
  FileText,
  Zap,
  CheckCircle2,
  Upload,
  Users,
  UserCog,
  Map,
  Package,
  Folder,
  type LucideIcon,
} from 'lucide-react'

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
  href: string
}

export const primaryNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '/' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { id: 'country', label: 'Country', icon: Globe, href: '/country' },
  { id: 'product', label: 'Product', icon: Package, href: '/product' },
  { id: 'category', label: 'Category', icon: Folder, href: '/category' },
  { id: 'document-types', label: 'Document types', icon: FileText, href: '/document-types' },
  { id: 'action-types', label: 'Action types', icon: Zap, href: '/action-types' },
  { id: 'status-types', label: 'Status types', icon: CheckCircle2, href: '/status-types' },
  { id: 'export-medias', label: 'Export medias', icon: Upload, href: '/export-medias' },
  { id: 'users', label: 'Users', icon: Users, href: '/users' },
  { id: 'user-master', label: 'User Master', icon: UserCog, href: '/user-master' },
  { id: 'regions', label: 'Regions', icon: Map, href: '/regions' },
]
