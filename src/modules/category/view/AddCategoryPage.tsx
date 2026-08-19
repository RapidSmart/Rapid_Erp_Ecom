import { useTranslation } from "@/shared/hooks";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useCategoryPageForm } from "../hooks/useCategoryPageForm";
import { CategoryForm } from "../components/CategoryForm";

export function AddCategoryPage() {
  const { t } = useTranslation();
  const form = useCategoryPageForm();

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("category.add.backToList")}
          breadcrumbItems={[
            { label: t("category.add.breadcrumb.masterData") },
            { label: t("category.add.breadcrumb.categories") },
            { label: t("category.add.breadcrumb.newCategory"), current: true },
          ]}
          title={t("category.add.title")}
          description={t("category.add.description")}
        />
        <CategoryForm mode="add" form={form} />
      </div>
    </div>
  );
}
