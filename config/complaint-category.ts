import * as React from "react";

import {
  BillIcon,
  BuildingIcon,
  CoinIcon,
  ConeIcon,
  FoodIcon,
  OthersIcon,
  PublicFacilityIcon,
  SecurityIcon,
} from "@/components/icons";
import { IconSvgProps } from "@/types";

export const categories: CategoryProps[] = [
  {
    Icon: BillIcon,
    key: "kebijakan-publik",
    label: "category-kebijakan-publik-text",
    addressRequired: false,
  },
  {
    Icon: ConeIcon,
    key: "kondisi-jalan",
    label: "category-kondisi-jalan-text",
    addressRequired: true,
  },
  {
    Icon: PublicFacilityIcon,
    key: "fasilitas-umum",
    label: "category-fasilitas-umum-text",
    addressRequired: true,
  },
  {
    Icon: FoodIcon,
    key: "makanan-bergizi",
    label: "category-makanan-bergizi-text",
    addressRequired: true,
  },
  {
    Icon: BuildingIcon,
    key: "program-pemerintah",
    label: "category-program-pemerintah-text",
    addressRequired: false,
  },
  {
    Icon: SecurityIcon,
    key: "keamanan",
    label: "category-keamanan-text",
    addressRequired: true,
  },
  {
    Icon: CoinIcon,
    key: "pungli",
    label: "category-pungli-text",
    addressRequired: true,
  },
  {
    Icon: OthersIcon,
    key: "lainnya",
    label: "category-lainnya-text",
    addressRequired: false,
  },
];

export type Category = {
  label: string;
  key: string;
  addressRequired: boolean;
};

type CategoryProps = Category & {
  Icon: React.FC<IconSvgProps>;
};
