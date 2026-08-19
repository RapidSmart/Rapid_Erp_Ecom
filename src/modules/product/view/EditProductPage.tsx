import { useParams } from "react-router-dom";
import { useTranslation } from "@/shared/hooks";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useProductPageForm } from "../hooks/useProductPageForm";
import { ProductForm } from "../components/ProductForm";

export function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const form = useProductPageForm({ id, isEditMode: true });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("product.edit.backToList")}
          breadcrumbItems={[
            { label: t("product.edit.breadcrumb.masterData") },
            { label: t("product.edit.breadcrumb.products") },
            { label: t("product.edit.breadcrumb.editProduct"), current: true },
          ]}
          title={t("product.edit.title")}
          description={t("product.edit.description")}
        />
        <ProductForm mode="edit" form={form} />
      </div>
    </div>
  );
}
