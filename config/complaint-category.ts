import {
  BillIcon,
  BuildingIcon,
  PublicFacilityIcon,
  CoinIcon,
  ConeIcon,
  FoodIcon,
  OthersIcon,
  SecurityIcon,
} from "@/components/icons";
import * as React from "react";
import { IconSvgProps } from "@/types";

export const categories: CategoryProps[] = [
  {
    Icon: BillIcon,
    label: "category-kebijakan-publik-text",
    addressRequired: false,
  },
  {
    Icon: ConeIcon,
    label: "category-kondisi-jalan-text",
    addressRequired: true,
  },
  {
    Icon: PublicFacilityIcon,
    label: "category-fasilitas-umum-text",
    addressRequired: true,
  },
  {
    Icon: FoodIcon,
    label: "category-makan-bergizi-text",
    addressRequired: true,
  },
  {
    Icon: BuildingIcon,
    label: "category-program-pemerintah-text",
    addressRequired: false,
  },
  {
    Icon: SecurityIcon,
    label: "category-keamanan-text",
    addressRequired: true,
  },
  { Icon: CoinIcon, label: "category-pungli-text", addressRequired: true },
  { Icon: OthersIcon, label: "category-lainnya-text", addressRequired: false },
];

export type Category = {
  label: string;
  addressRequired: boolean;
};

type CategoryProps = Category & {
  Icon: React.FC<IconSvgProps>;
};
