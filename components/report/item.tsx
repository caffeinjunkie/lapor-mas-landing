import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import { PriorityChipColor, PriorityLabel } from "@/config/report";
import { Report } from "@/types/report.types";
import { formatLocaleDate } from "@/utils/date/index";

type ItemProps = {
  item: Report;
};

export const Item = ({ item }: ItemProps) => {
  const t = useTranslations("HomePage");
  const hasAddress =
    item.address !== null &&
    (item.address?.district !== "-" || item.address?.district !== null);

  return (
    <Card>
      <CardBody>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col w-full gap-1 justify-between">
            <div className="flex flex-row items-center gap-1 text-sm">
              <Chip
                color={
                  PriorityChipColor[
                    item.priority as keyof typeof PriorityChipColor
                  ]
                }
                size="sm"
                classNames={{
                  content: "font-semibold",
                }}
                variant="flat"
                radius="full"
                className={clsx("text-center")}
              >
                {t(PriorityLabel[item.priority as keyof typeof PriorityLabel])}
              </Chip>
              <Chip
                color="default"
                size="sm"
                classNames={{
                  content: "font-semibold",
                }}
                variant="solid"
                radius="full"
                className={clsx("text-center")}
              >
                {t(`category-${item.category}-text`)}
              </Chip>
            </div>
            <p className="text-base font-semibold line-clamp-1">{item.title}</p>
            <div className="flex flex-row justify-end items-center gap-1 pt-0.5 text-default-500 text-xs">
              {hasAddress && <p>{item.address?.district}</p>}
              {hasAddress && <span className="text-default-500">|</span>}
              <p>{formatLocaleDate(item.created_at)}</p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
