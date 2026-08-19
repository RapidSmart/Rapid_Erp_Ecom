import { useTranslation } from "@/shared/hooks";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useCountryPageForm } from "../hooks/useCountryPageForm";
import { CountryForm } from "../components/CountryForm";

export function AddCountryPage() {
  const { t } = useTranslation();
  const form = useCountryPageForm();

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("country.add.backToList")}
          breadcrumbItems={[
            { label: t("country.add.breadcrumb.masterData") },
            { label: t("country.add.breadcrumb.countries") },
            { label: t("country.add.breadcrumb.newCountry"), current: true },
          ]}
          title={t("country.add.title")}
          description={t("country.add.description")}
        />
        <CountryForm mode="add" form={form} />
      </div>
    </div>
  );
}

