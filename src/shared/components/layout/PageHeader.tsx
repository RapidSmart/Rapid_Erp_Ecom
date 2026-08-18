import { IconChevronLeft } from "@/shared/icons/IconChevronLeft";
import { Breadcrumb } from "./Breadcrumb";
import type { PageHeaderProps } from "./types/page-header.types";

export type { PageHeaderProps } from "./types/page-header.types";

export function PageHeader({
  backText,
  onBack,
  backHref = "#",
  breadcrumbItems,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <header className="mb-6">
      {/* Back button */}
      {backText && (
        <div className="mb-5">
          <a
            href={backHref}
            onClick={(e) => {
              if (onBack) {
                e.preventDefault();
                onBack();
              }
            }}
            className="inline-flex h-[40px] items-center gap-[10px] rounded-full border border-slate-200 bg-white px-4 text-[13.5px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <IconChevronLeft />
            {backText}
          </a>
        </div>
      )}

      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Title & Description */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[23px] font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-[13.5px] text-slate-500">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </header>
  );
}
