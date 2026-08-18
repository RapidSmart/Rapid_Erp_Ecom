import { useTranslation } from "@/shared/hooks";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useCountryForm } from "../hooks/useCountryForm";
import { CountryForm } from "../components/CountryForm";

export function AddCountryPage() {
  const { t } = useTranslation();
  const form = useCountryForm();

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("countries.add.backToList")}
          breadcrumbItems={[
            { label: t("countries.add.breadcrumb.masterData") },
            { label: t("countries.add.breadcrumb.countries") },
            { label: t("countries.add.breadcrumb.newCountry"), current: true },
          ]}
          title={t("countries.add.title")}
          description={t("countries.add.description")}
        />
        <CountryForm mode="add" form={form} />
      </div>
    </div>
  );
}
