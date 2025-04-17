import React from "react";
import { Input, Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

import { categories, Category } from "@/config/complaint-category";
import { FileIcon } from "@/components/icons";
import { useTranslations } from "next-intl";
import { Report } from "@/types/report.types";

interface ComplaintFormProps {
  address: Report["address"] | null;
  category: Category | null;
  setCategory: (category: Category) => void;
  onClose: () => void;
  title: string;
  description: string;
  files: File[];
  isCategorySelectionLocked: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ComplaintForm = ({
  address,
  category,
  isCategorySelectionLocked,
  setCategory,
  title,
  description,
  files,
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
      }}
    >
      <Input
        isRequired
        errorMessage={t("title-error-message")}
        label={t("title-input-text")}
        defaultValue={title}
        name="title"
        type="text"
      />
      <Textarea
        label={t("description-textarea-text")}
        name="description"
        defaultValue={description}
        isRequired
        errorMessage={t("description-error-message")}
      />
      <Select
        isRequired
        defaultSelectedKeys={[category?.key || ""]}
        isDisabled={isCategorySelectionLocked}
        label={t("category-select-text")}
        name="category"
        placeholder={category ? category?.key : ""}
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
          defaultValue={address?.full_address ?? ""}
          errorMessage={t("address-error-message")}
          label={t("address-input-text")}
          name="address"
          type="text"
        />
      )}
      <div className="flex flex-row py-4 items-center justify-center gap-1 w-full">
        <FileIcon />
        <p className="text-small font-medium">
          {t("file-attached", { count: files.length })}
        </p>
      </div>
      <div className="flex w-full justify-between pb-2">
        <Button color="danger" variant="light" onPress={onClose}>
          {t("cancel-text")}
        </Button>
        <Button color="primary" type="submit">
          {t("continue-text")}
        </Button>
      </div>
    </Form>
  );
};
