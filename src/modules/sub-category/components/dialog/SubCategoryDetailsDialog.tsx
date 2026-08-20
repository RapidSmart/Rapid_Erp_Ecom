import { Link } from "react-router-dom";
import { SubCategoryImage } from "../SubCategoryImage";
import { StatusBadge, formatUpdatedAtFull } from "@/modules/common-data";
import type { SubCategoryDetailsDialogProps } from "../../types/sub-category.types";
import { useTranslation } from "@/i18n";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

export function SubCategoryDetailsDialog({
  subCategory,
  onDuplicate,
  onDelete,
  onClose,
}: SubCategoryDetailsDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-sm"
        closeLabel={t("subCategory.details.close")}
      >
        <DialogHeader>
          <DialogTitle className="sr-only">
            {t("subCategory.details.title")}
          </DialogTitle>
          <div className="flex items-center gap-2.5">
            <SubCategoryImage imageUrl={subCategory.imageUrl} name={subCategory.name} />
            <span className="truncate text-base font-semibold text-ink">
              {subCategory.name}
            </span>
            <StatusBadge status={subCategory.status} className="ml-auto" />
          </div>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-surface-border bg-surface-muted/60 px-4 py-3">
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("subCategory.details.code")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-semibold text-ink">
              {subCategory.code}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("subCategory.details.status")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink capitalize">
              {subCategory.status}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("subCategory.details.description")}
            </dt>
            <dd className="mt-1.5 text-[13px] text-ink-muted leading-relaxed">
              {subCategory.description}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("subCategory.details.updated")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {formatUpdatedAtFull(subCategory.updatedAt)}
            </dd>
          </div>
        </dl>

        <DialogFooter className="flex-wrap justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onDuplicate(subCategory)}>
              {t("subCategory.card.duplicate")}
            </Button>
            <Button variant="destructive" onClick={() => onDelete(subCategory)}>
              {t("subCategory.card.delete")}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {t("subCategory.details.close")}
            </Button>
            <Link
              to={`/sub-category/${subCategory.code}/edit`}
              className="bg-brand-accent flex rounded-sm items-center justify-center px-4 text-brand-accent-foreground hover:bg-brand-accent/90"
            >
              {t("subCategory.details.edit")}
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
