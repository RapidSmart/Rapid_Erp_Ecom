import { useTranslation } from "@/shared/hooks";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { CountryFlag } from "@/shared/components/country-flag";
import { CountryStatusBadge } from "@/shared/components/country-status-badge";

const CountryDetailsDialog = ({ country, onClose, onDuplicate, onDelete }: any) => {
  const { t } = useTranslation();

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-sm"
      >
        <DialogHeader>
          <DialogTitle className="sr-only">
            {t("country.details.title")}
          </DialogTitle>
          <div className="flex items-center gap-2.5">
            <CountryFlag iso2={country.iso2} />
            <span className="truncate text-base font-semibold text-ink">
              {country.name}
            </span>
            <CountryStatusBadge status={country.status} className="ml-auto" />
          </div>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 rounded-xl border border-surface-border bg-surface-muted/60 px-4 py-3">
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("country.details.iso2")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {country.iso2}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("country.details.iso3")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {country.iso3}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("country.details.countryCode")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {country.countryCode}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("country.details.nativeName")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {country.nativeName}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("country.details.isoNumeric")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {country.isoNumeric}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("country.details.isDefault")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {country.isDefault ? t("country.add.fields.isDefault") : ''}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-[10px] tracking-[0.08em] text-ink-subtle uppercase">
              {t("country.details.updated")}
            </dt>
            <dd className="mt-1.5 text-[13px] font-medium text-ink">
              {formatUpdatedAtFull(country.updatedAt)}
            </dd>
          </div>
        </dl>

        <DialogFooter className="flex-wrap justify-between sm:justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onDuplicate(country)}>
              {t("country.card.duplicate")}
            </Button>
            <Button variant="destructive" onClick={() => onDelete(country)}>
              {t("country.card.delete")}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {t("country.details.close")}
            </Button>
            <Link 
              to={`/country/${country.id}/edit`}
              className={buttonVariants()}
            >
              {t("country.details.edit")}
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { CountryDetailsDialog };
