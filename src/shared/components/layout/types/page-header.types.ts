import type { ReactNode } from "react";
import type { BreadcrumbItem } from "./breadcrumb.types";

export interface PageHeaderProps {
  backText?: string;
  onBack?: () => void;
  backHref?: string;
  breadcrumbItems: BreadcrumbItem[];
  title: string;
  description?: string;
  action?: ReactNode;
}
