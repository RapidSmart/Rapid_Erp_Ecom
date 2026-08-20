import { useTranslation } from "@/shared/hooks";
import { useLocation } from "react-router-dom";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useSubCategoryPageForm } from "../hooks/useSubCategoryPageForm";
import { SubCategoryForm } from "../components/SubCategoryForm";

export function AddSubCategoryPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const initialValues = location.state?.initialValues;
  const form = useSubCategoryPageForm({ initialValues });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("subCategory.add.backToList")}
          backHref="/sub-category"
          breadcrumbItems={[
            { label: t("subCategory.add.breadcrumb.masterData") },
            { label: t("subCategory.add.breadcrumb.subCategories") },
            { label: t("subCategory.add.breadcrumb.newSubCategory"), current: true },
          ]}
          title={t("subCategory.add.title")}
          description={t("subCategory.add.description")}
        />
        <SubCategoryForm mode="add" form={form} />
      </div>
    </div>
  );
}
