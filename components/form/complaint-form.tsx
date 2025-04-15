import React from "react";
import { Input, Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

import { categories, Category } from "@/config/complaint-category";
import { FileIcon } from "@/components/icons";
import { Address } from "@/utils/google-maps";
import { useTranslations } from "next-intl";

interface ComplaintFormProps {
  address: Address | null;
  category: Category | null;
  setCategory: (category: Category) => void;
  onClose: () => void;
  isCategorySelectionLocked: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ComplaintForm = ({
  address,
  category,
  isCategorySelectionLocked,
  setCategory,
  onClose,
  onSubmit,
}: ComplaintFormProps) => {
  const t = useTranslations("ComplaintForm");
  return (
    <Form
      className="w-full max-w-xl flex flex-col gap-4"
      validationBehavior="native"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        onSubmit(e);
        onClose();
      }}
    >
      <Input
        isRequired
        errorMessage={t("title-error-message")}
        label="Judul"
        name="title"
        type="text"
      />
      <Textarea
        label="Deskripsi"
        name="description"
        isRequired
        errorMessage={t("description-error-message")}
      />
      <Select
        isRequired
        defaultSelectedKeys={[category?.label || ""]}
        isDisabled={isCategorySelectionLocked}
        label="Kategori Laporan"
        name="category"
        errorMessage={t("select-category-error-message")}
        onChange={(event) => {
          setCategory({
            key: event.target.value,
            label: event.target.value,
            addressRequired:
              categories.find(({ key }) => key === event.target.value)
                ?.addressRequired ?? false,
          });
        }}
      >
        {categories.map((category) => (
          <SelectItem key={category.key}>{t(category.label)}</SelectItem>
        ))}
      </Select>
      {category?.addressRequired && (
        <Input
          isRequired
          defaultValue={address?.formattedAddress ?? ""}
          errorMessage={t("address-error-message")}
          label="Alamat"
          name="address"
          type="text"
        />
      )}
      <div className="flex flex-row py-4 items-center justify-center gap-1 w-full">
        <FileIcon />
        <p className="text-small font-medium">File terlampir</p>
      </div>
      <div className="flex w-full justify-between pb-2">
        <Button color="danger" variant="light" onPress={onClose}>
          {t("create-report-cancel-text")}
        </Button>
        <Button color="primary" type="submit">
          {t("create-report-continue-text")}
        </Button>
      </div>
    </Form>
  );
};
