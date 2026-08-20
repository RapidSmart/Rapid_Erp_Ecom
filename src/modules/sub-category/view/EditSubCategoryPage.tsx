import { useParams } from "react-router-dom";
import { useTranslation } from "@/shared/hooks";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useSubCategoryPageForm } from "../hooks/useSubCategoryPageForm";
import { SubCategoryForm } from "../components/SubCategoryForm";

export function EditSubCategoryPage() {
  const { code } = useParams<{ code: string }>();
  const { t } = useTranslation();
  const form = useSubCategoryPageForm({ code, isEditMode: true });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("subCategory.edit.backToList")}
          backHref="/sub-category"
          breadcrumbItems={[
            { label: t("subCategory.edit.breadcrumb.masterData") },
            { label: t("subCategory.edit.breadcrumb.subCategories") },
            { label: t("subCategory.edit.breadcrumb.editSubCategory"), current: true },
          ]}
          title={t("subCategory.edit.title")}
          description={t("subCategory.edit.description")}
        />
        <SubCategoryForm mode="edit" form={form} />
      </div>
    </div>
  );
}
