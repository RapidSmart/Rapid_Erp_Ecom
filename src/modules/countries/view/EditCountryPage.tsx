import { useParams } from "react-router-dom";
import { useTranslation } from "@/shared/hooks";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useCountryForm } from "../hooks/useCountryForm";
import { MOCK_EDIT_COUNTRY } from "../constants/mock.countries";
import { CountryForm } from "../components/CountryForm";

interface EditCountryPageProps {
  id?: string;
}

export function EditCountryPage({ id: propId }: EditCountryPageProps) {
  const params = useParams<{ id: string }>();
  const countryId = propId ?? params.id ?? "us-1";

  const { t } = useTranslation();
  const form = useCountryForm({
    id: countryId,
    isEditMode: true,
    initialValues: MOCK_EDIT_COUNTRY,
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("countries.edit.backToList")}
          breadcrumbItems={[
            { label: t("countries.edit.breadcrumb.masterData") },
            { label: t("countries.edit.breadcrumb.countries") },
            {
              label: t("countries.edit.breadcrumb.editCountry"),
              current: true,
            },
          ]}
          title={t("countries.edit.title")}
          description={t("countries.edit.description")}
        />
        <CountryForm mode="edit" form={form} />
      </div>
    </div>
  );
}
