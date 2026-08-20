import { Link } from "react-router-dom";
import { DepartmentImage } from "../DepartmentImage";
import { DepartmentStatusBadge } from "../DepartmentStatusBadge";
import { formatUpdatedAtFull } from "../../utils/format-updated-at";
import type { DepartmentDetailsDialogProps } from "../../types/department.types";
import { useTranslation } from "@/i18n";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

export function DepartmentDetailsDialog({
  department,
  onDuplicate,
  onDelete,
  onClose,
}: DepartmentDetailsDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-sm"
        closeLabel={t("department.details.close")}
      >
        <DialogHeader>
          <DialogTitle className="sr-only">
            {t("department.details.title")}
          </DialogTitle>
          <div className="flex items-center gap-2.5">
            <DepartmentImage imageUrl={department.imageUrl} name={department.name} />
            <span className="truncate text-base font-semibold text-ink">
              {department.name}
            </span>
            <DepartmentStatusBadge status={department.status} className="ml-auto" />
          </div>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-surface-border bg-surface-muted/60 px-4 py-3">
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("department.details.code")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-semibold text-ink">
              {department.code}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("department.details.status")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink capitalize">
              {department.status}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("department.details.description")}
            </dt>
            <dd className="mt-1.5 text-[13px] text-ink-muted leading-relaxed">
              {department.description}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("department.details.updated")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {formatUpdatedAtFull(department.updatedAt)}
            </dd>
          </div>
        </dl>

        <DialogFooter className="flex-wrap justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onDuplicate(department)}>
              {t("department.card.duplicate")}
            </Button>
            <Button variant="destructive" onClick={() => onDelete(department)}>
              {t("department.card.delete")}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {t("department.details.close")}
            </Button>
            <Link
              to={`/department/${department.code}/edit`}
              className="bg-brand-accent flex rounded-sm items-center justify-center px-4 text-brand-accent-foreground hover:bg-brand-accent/90"
            >
              {t("department.details.edit")}
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
