import React from "react";
import { Input, Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";

import { categories, Category } from "@/config/complaint-category";
import { FileIcon } from "@/components/icons";
import { Address } from "@/utils/google-maps";

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
}: ComplaintFormProps) => (
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
      errorMessage="Mohon masukkan judul laporan."
      label="Judul"
      name="title"
      placeholder="Tulis judul laporan"
      type="text"
    />
    <Textarea
      label="Deskripsi"
      name="description"
      placeholder="Tulis deskripsi laporan"
    />
    <Select
      isRequired
      defaultSelectedKeys={[category?.label || ""]}
      isDisabled={isCategorySelectionLocked}
      label="Kategori Laporan"
      name="category"
      placeholder="Pilih kategori laporan"
      onChange={(event) => {
        setCategory({
          label: event.target.value,
          addressRequired: categories.filter(
            ({ label }) => label === event.target.value,
          )[0].addressRequired,
        });
      }}
    >
      {Object.entries(categories).map((category) => (
        <SelectItem key={category[1].label}>{category[1].label}</SelectItem>
      ))}
    </Select>
    {category?.addressRequired && (
      <Input
        isRequired
        defaultValue={address?.formattedAddress ?? ""}
        errorMessage="Mohon masukkan alamat kejadian."
        label="Alamat"
        name="address"
        placeholder="Tulis alamat kejadian"
        type="text"
      />
    )}
    <div className="flex flex-row py-4 items-center justify-center gap-1 w-full">
      <FileIcon />
      <p className="text-small font-medium">File terlampir</p>
    </div>
    <div className="flex w-full justify-between pb-2">
      <Button color="danger" variant="light" onPress={onClose}>
        Batal
      </Button>
      <Button color="primary" type="submit">
        Simpan
      </Button>
    </div>
  </Form>
);
