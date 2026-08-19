import { cn } from "@/shared/utils";
import type { BreadcrumbProps } from "./types/breadcrumb.types";

export type { BreadcrumbItem, BreadcrumbProps } from "./types/breadcrumb.types";

export function Breadcrumb({
  items,
  className,
  separator = "/",
}: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-3", className)}>
      <ol className="flex items-center gap-1.5 text-[12.5px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.current;

          return (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span aria-hidden="true" className="select-none text-slate-300">
                  {separator}
                </span>
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-semibold text-slate-900"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="font-medium text-slate-500 transition-colors hover:text-slate-900"
                >
                  {item.label}
                </a>
              ) : (
                <span className="font-medium text-slate-500">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
