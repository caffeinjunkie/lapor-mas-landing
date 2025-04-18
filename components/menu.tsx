import { useTranslations } from "next-intl";
import React from "react";

import { Category, categories } from "@/config/complaint-category";

type MenuProps = {
  onMenuPress: (category: Category) => void;
};

export const Menu = ({ onMenuPress }: MenuProps) => {
  const t = useTranslations("HomePage");

  return (
    <div className="py-6">
      <div className="grid grid-cols-4 gap-4 lg:grid-cols-8">
        {categories.map(({ Icon, ...category }, index) => (
          <button
            key={index}
            className="group flex flex-col
            items-center gap-4
            overflow-hidden
            outline-none
            transform transition-transform duration-200 active:scale-95"
            onClick={() => onMenuPress(category)}
          >
            <div
              className="flex flex-col items-center
              justify-center bg-gray-400/20 rounded-lg md:rounded-2xl
              w-12 h-12 md:w-16 md:h-16
              transform transition-transform duration-200 group-hover:bg-gray-400/30"
            >
              <Icon />
            </div>
            <span className="text-center text-xs sm:text-medium font-medium text-ellipsis">
              {t(category.label)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
