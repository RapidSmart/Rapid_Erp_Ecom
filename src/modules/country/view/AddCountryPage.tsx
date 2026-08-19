import { useTranslation } from "@/shared/hooks";
import { useLocation } from "react-router-dom";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useCountryPageForm } from "../hooks/useCountryPageForm";
import { CountryForm } from "../components/CountryForm";

export function AddCountryPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const initialValues = location.state?.initialValues;
  const form = useCountryPageForm({ initialValues });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("country.add.backToList")}
          backHref="/country"
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

