import { useParams } from "react-router-dom";
import { useTranslation } from "@/shared/hooks";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useCountryPageForm } from "../hooks/useCountryPageForm";
import { MOCK_EDIT_COUNTRY } from "../constants/mock.countries";
import { CountryForm } from "../components/CountryForm";

interface EditCountryPageProps {
  id?: string;
}

export function EditCountryPage({ id: propId }: EditCountryPageProps) {
  const params = useParams<{ id: string }>();
  const countryId = propId ?? params.id ?? "us-1";

  const { t } = useTranslation();
  const form = useCountryPageForm({
    id: countryId,
    isEditMode: true,
    initialValues: MOCK_EDIT_COUNTRY,
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("country.edit.backToList")}
          backHref="/country"
          breadcrumbItems={[
            { label: t("country.edit.breadcrumb.masterData") },
            { label: t("country.edit.breadcrumb.countries") },
            {
              label: t("country.edit.breadcrumb.editCountry"),
              current: true,
            },
          ]}
          title={t("country.edit.title")}
          description={t("country.edit.description")}
        />
        <CountryForm mode="edit" form={form} />
      </div>
    </div>
  );
}

