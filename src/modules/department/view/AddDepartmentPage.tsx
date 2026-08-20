import { useTranslation } from "@/shared/hooks";
import { useLocation } from "react-router-dom";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useDepartmentPageForm } from "../hooks/useDepartmentPageForm";
import { DepartmentForm } from "../components/DepartmentForm";

export function AddDepartmentPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const initialValues = location.state?.initialValues;
  const form = useDepartmentPageForm({ initialValues });

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1560px]">
        <PageHeader
          backText={t("department.add.backToList")}
          backHref="/department"
          breadcrumbItems={[
            { label: t("department.add.breadcrumb.masterData") },
            { label: t("department.add.breadcrumb.departments") },
            { label: t("department.add.breadcrumb.newDepartment"), current: true },
          ]}
          title={t("department.add.title")}
          description={t("department.add.description")}
        />
        <DepartmentForm mode="add" form={form} />
      </div>
    </div>
  );
}
