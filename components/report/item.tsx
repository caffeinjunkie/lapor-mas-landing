import { Card } from "@heroui/card";

import { categories } from "@/config/complaint-category";
import { formatLocaleDate } from "@/utils/date/index";


type ItemProps = {
    title: string;
    category: string;
    date: string;
    image?: string;
    isLast: boolean;
  };

export const Item = ({ title, category, date, isLast, image }: ItemProps) => {
  const Icon = categories.filter(({ key }) => key === category)[0].Icon;

  return (
    <Card
      className={`flex items-center flex-row gap-3 w-full p-4`}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-400/20 rounded-md overflow-hidden flex items-center justify-center">
        {!image && <Icon size={48} />}
        {image && (
          <img
            alt={title}
            className="object-cover w-16 h-16 md:w-20 md:h-20"
            src={image}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col w-24 overflow-hidden">
        <p className="text-[10px] md:text-xs">{category}</p>
        <p
          className="text-sm font-semibold pt-1 pb-2.5 md:pb-3
          whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {title}
        </p>
        <div className="flex flex-row justify-end items-center w-full">
          <p className="text-xs font-light">{formatLocaleDate(date)}</p>
        </div>
      </div>
    </Card>
  );
};