import { useParams } from "react-router-dom";
import { useTranslation } from "@/shared/hooks";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useCategoryPageForm } from "../hooks/useCategoryPageForm";
import { CategoryForm } from "../components/CategoryForm";

export function EditCategoryPage() {
  const { code } = useParams<{ code: string }>();
  const { t } = useTranslation();
  const form = useCategoryPageForm({ code, isEditMode: true });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("category.edit.backToList")}
          breadcrumbItems={[
            { label: t("category.edit.breadcrumb.masterData") },
            { label: t("category.edit.breadcrumb.categories") },
            { label: t("category.edit.breadcrumb.editCategory"), current: true },
          ]}
          title={t("category.edit.title")}
          description={t("category.edit.description")}
        />
        <CategoryForm mode="edit" form={form} />
      </div>
    </div>
  );
}
