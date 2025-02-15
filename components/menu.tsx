import React from "react";

import { category } from "@/config/complaint-category";

type MenuProps = {
  onMenuPress: (category: string) => void;
};

const Menu = ({ onMenuPress }: MenuProps) => (
  <div className="px-4 py-6">
    <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
      {category.map(({ Icon, label }, index) => (
        <button
          key={index}
          onClick={() => onMenuPress(label)}
          className="group flex flex-col
            items-center gap-4
            overflow-hidden
            transform transition-transform duration-200 active:scale-95"
        >
          <div
            className="flex flex-col items-center
              justify-center bg-gray-400/20 rounded-lg
              w-12 h-12 md:w-16 md:h-16
              transform transition-transform duration-200 group-hover:bg-gray-400/30"
          >
            <Icon />
          </div>
          <span className="text-center text-xs sm:text-medium font-medium text-ellipsis">
            {label}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default Menu;
