import React from "react";
import { Item } from "./item";
import clsx from "clsx";

interface BottomSheetProps {
  children?: React.ReactNode;
  title: string;
  isEmpty?: boolean;
}

export const ReportList = ({ title, children, isEmpty }: BottomSheetProps) => {
  return (
    <div className="w-full flex flex-col gap-2 md:gap-4">
      <p className="text-medium font-semibold text-left md:text-center">
        {title}
      </p>
      <div
        className={clsx(
          "grid grid-cols-1 gap-2 md:gap-4",
          isEmpty ? "lg:grid-cols-1" : "lg:grid-cols-2",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const Empty = ({ value }: { value: string }) => (
  <div className="flex items-center bg-gray-400/10 rounded-xl justify-center text-center text-small min-h-52">
    <p color="danger">{value}</p>
  </div>
);

ReportList.Item = Item;

ReportList.Empty = Empty;
