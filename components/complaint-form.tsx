import React from "react";
import { Input, Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { getLocalTimeZone, now } from "@internationalized/date";

import { categories, Category } from "@/config/complaint-category";
import { FileIcon } from "@/components/icons";
import { Address } from "@/utils/google-maps";
import { formatDate } from "@/utils/date";
import { saveToSessionStorage, SessionData } from "@/utils/session-storage";

interface ComplaintFormProps {
  address: Address | null;
  category: Category | null;
  setCategory: (category: Category) => void;
  onClose: () => void;
  isCategorySelectionLocked: boolean;
  handleGetData: () => void;
}

export const ComplaintForm = ({
  address,
  category,
  isCategorySelectionLocked,
  setCategory,
  onClose,
  handleGetData,
}: ComplaintFormProps) => (
  <Form
    className="w-full max-w-xl flex flex-col gap-4"
    validationBehavior="native"
    onSubmit={(e) => {
      e.preventDefault();
      const dataFromEntries = Object.fromEntries(new FormData(e.currentTarget));
      const enrichedData: any = {
        ...dataFromEntries,
        category: category?.label,
        date: formatDate(now(getLocalTimeZone()).toString()),
      };

      saveToSessionStorage(enrichedData);
      onClose();
      handleGetData();
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
      isDisabled={isCategorySelectionLocked}
      defaultSelectedKeys={[category?.label || ""]}
      label="Kategori Laporan"
      name="category"
      onChange={(event) => {
        setCategory({
          label: event.target.value,
          addressRequired: categories.filter(
            ({ label }) => label === event.target.value,
          )[0].addressRequired,
        });
      }}
      placeholder="Pilih kategori laporan"
    >
      {Object.entries(categories).map((category) => (
        <SelectItem key={category[1].label}>{category[1].label}</SelectItem>
      ))}
    </Select>
    {category?.addressRequired && (
      <Input
        isRequired
        errorMessage="Mohon masukkan alamat kejadian."
        label="Alamat"
        name="address"
        placeholder="Tulis alamat kejadian"
        type="text"
        value={address?.formattedAddress ?? ""}
      />
    )}
    <div className="flex flex-row py-4 items-center justify-center gap-1 w-full">
      <FileIcon />
      <p className="text-small font-medium">File terlampir</p>
    </div>
    <div className="flex w-full justify-between pb-2">
      <Button onPress={onClose} color="danger" variant="light">
        Batal
      </Button>
      <Button color="primary" type="submit">
        Simpan
      </Button>
    </div>
  </Form>
);
