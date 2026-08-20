import { useParams } from "react-router-dom";
import { useTranslation } from "@/shared/hooks";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useDepartmentPageForm } from "../hooks/useDepartmentPageForm";
import { DepartmentForm } from "../components/DepartmentForm";

export function EditDepartmentPage() {
  const { code } = useParams<{ code: string }>();
  const { t } = useTranslation();
  const form = useDepartmentPageForm({ code, isEditMode: true });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("department.edit.backToList")}
          backHref="/department"
          breadcrumbItems={[
            { label: t("department.edit.breadcrumb.masterData") },
            { label: t("department.edit.breadcrumb.departments") },
            { label: t("department.edit.breadcrumb.editDepartment"), current: true },
          ]}
          title={t("department.edit.title")}
          description={t("department.edit.description")}
        />
        <DepartmentForm mode="edit" form={form} />
      </div>
    </div>
  );
}
