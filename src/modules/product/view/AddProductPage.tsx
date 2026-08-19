import { useTranslation } from "@/shared/hooks";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useProductPageForm } from "../hooks/useProductPageForm";
import { ProductForm } from "../components/ProductForm";

export function AddProductPage() {
  const { t } = useTranslation();
  const form = useProductPageForm();

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("product.add.backToList")}
          backHref="/product"
          breadcrumbItems={[
            { label: t("product.add.breadcrumb.masterData") },
            { label: t("product.add.breadcrumb.products") },
            { label: t("product.add.breadcrumb.newProduct"), current: true },
          ]}
          title={t("product.add.title")}
          description={t("product.add.description")}
        />
        <ProductForm mode="add" form={form} />
      </div>
    </div>
  );
}
