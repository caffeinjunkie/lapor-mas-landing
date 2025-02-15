import React from "react";

import { categories } from "@/config/complaint-category";

interface BottomSheetProps {
  children?: React.ReactNode;
}

type ItemProps = {
  title: string;
  category: string;
  date: string;
  isLast: boolean;
};

export const ReportList = ({ children }: BottomSheetProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <p className="text-medium font-semibold text-left md:text-center">
        Kasus Terlapor
      </p>
      <div className="bg-gray-400/10 rounded-lg">{children}</div>
    </div>
  );
};

export const Item = ({ title, category, date, isLast }: ItemProps) => {
  const Icon = categories.filter(({ label }) => label === category)[0].Icon;

  return (
    <div
      className={`flex items-center gap-3 w-full p-4 ${!isLast ? "border-b-2 border-gray-500/20" : ""}`}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-400/20 rounded-md overflow-hidden flex items-center justify-center">
        <Icon size={48} />
      </div>
      <div className="flex flex-1 flex-col w-24 overflow-hidden">
        <p className="text-[10px] md:text-xs">{category}</p>
        <p
          className="text-sm md:text-large font-semibold pt-1 pb-2.5 md:pb-3
          whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {title}
        </p>
        <div className="flex flex-row justify-end items-center w-full">
          <p className="text-[10px] md:text-sm font-light">{date}</p>
        </div>
      </div>
    </div>
  );
};

export const Empty = () => (
  <div className="flex items-center justify-center text-center text-small min-h-52">
    <p color="danger">Tidak ada laporan.</p>
  </div>
);

ReportList.Item = Item;

ReportList.Empty = Empty;
