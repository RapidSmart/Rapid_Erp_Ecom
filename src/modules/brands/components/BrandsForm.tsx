import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { useTranslation } from "@/i18n";
import { PillInput } from "./PillInput";
import { SectionHeader } from "./SectionHeader";
import { FormFooter } from "./FormFooter";
import { Upload, X } from "lucide-react";

import type { Brand, BrandPayload } from "../types/brands.types";

export interface BrandsFormProps {
  brand?: Brand;
  onSubmit?: (payload: BrandPayload) => void;
  submitting?: boolean;
}

export function BrandsForm({ brand, onSubmit, submitting }: BrandsFormProps) {
  const { t } = useTranslation();
  
  const [code, setCode] = useState(brand?.code || "");
  const [name, setName] = useState(brand?.name || "");
  const [description, setDescription] = useState(brand?.description || "");
  const [image, setImage] = useState(brand?.image || "");
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filledCount = [code, name].filter((v) => v.trim().length > 0).length;

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    if (!code || !name) {
      alert("Code and Name are required");
      return;
    }
    if (onSubmit) {
      onSubmit({
        code,
        name,
        description,
        image: image || undefined,
        status: brand?.status || 'active',
      });
    }
  };

  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm sm:rounded-3xl sm:px-6 sm:pb-6 sm:pt-7 lg:px-8">
      <form noValidate onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {/* IDENTITY */}
        <section aria-label="Identity" className="mb-5 sm:mb-6">
          <SectionHeader label="IDENTITY" />
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-[1fr_2fr]">
            <PillInput
              id="brand-code"
              placeholder={t("brands.form.codePlaceholder") || "e.g. TECH"}
              value={code}
              onChange={setCode}
              maxLength={10}
              required
            />
            <PillInput
              id="brand-name"
              placeholder={t("brands.form.namePlaceholder") || "e.g. Technology"}
              value={name}
              onChange={setName}
              maxLength={40}
              required
            />
          </div>
        </section>

        {/* IMAGE AND DESCRIPTION */}
        <section aria-label="Image and Description" className="mb-5 sm:mb-6">
          <SectionHeader label="IMAGE AND DESCRIPTION" />

          <div
            role="region"
            aria-label="Image upload area"
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex h-[108px] w-full items-center justify-center rounded-[26px] border border-dashed transition-colors cursor-pointer overflow-hidden ${
              isDragging ? 'border-blue-400 bg-blue-50' : 'border-[#cdd6e3] bg-[#f4f6f9] hover:bg-slate-100/80'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files[0]) {
                  handleImageFile(e.target.files[0]);
                }
              }}
            />
            {image ? (
              <>
                <div className="flex h-full w-full items-center justify-center p-2">
                  <img src={image} alt="Preview" className="h-full max-w-[200px] rounded-lg object-contain" />
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setImage(""); }}
                  className="absolute right-3 top-3 rounded-full bg-black/50 p-1.5 text-white hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                >
                  <X className="size-4" />
                </button>
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 outline-none">
                <Upload className="text-slate-400 size-6" />
                <span className="text-[14.5px] font-medium text-slate-600">
                  Upload image here or drag
                </span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="sr-only">
              {t("brands.form.descriptionPlaceholder") || "Description"}
            </label>
            <textarea
              id="description"
              rows={4}
              maxLength={200}
              placeholder={t("brands.form.descriptionPlaceholder") || "Description"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-2xl border border-transparent bg-gray-100 p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-blue-400 sm:rounded-3xl sm:p-[22px] sm:text-[14.5px]"
            />
          </div>
        </section>

        {/* FOOTER */}
        <FormFooter
          filledCount={filledCount}
          totalCount={2}
          filledText={`${filledCount} of 2 required fields filled`}
          duplicateText={t("brands.form.submitDuplicate") || "Duplicate"}
          printText="Print"
          clearText="Clear"
          saveText={submitting ? t("brands.form.submitting") || "Saving..." : (t("brands.form.submitCreate") || "Save brand")}
          onDuplicate={() => {}}
          onPrint={() => {}}
          onClear={() => {
            setCode("");
            setName("");
            setDescription("");
            setImage("");
          }}
          onSave={handleSave}
        />
      </form>
    </article>
  );
}
