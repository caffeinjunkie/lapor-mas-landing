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
  { Icon: BillIcon, label: "Kebijakan Publik", addressRequired: false },
  { Icon: ConeIcon, label: "Kondisi Jalan", addressRequired: true },
  { Icon: PublicFacilityIcon, label: "Fasilitas Umum", addressRequired: true },
  { Icon: FoodIcon, label: "Makan Bergizi", addressRequired: true },
  { Icon: BuildingIcon, label: "Program Pemerintah", addressRequired: false },
  { Icon: SecurityIcon, label: "Keamanan", addressRequired: true },
  { Icon: CoinIcon, label: "Pungli", addressRequired: true },
  { Icon: OthersIcon, label: "Lainnya", addressRequired: false },
];

export type Category = {
  label: string;
  addressRequired: boolean;
};

type CategoryProps = Category & {
  Icon: React.FC<IconSvgProps>;
};
