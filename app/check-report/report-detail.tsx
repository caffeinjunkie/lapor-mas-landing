import {
  CalendarDaysIcon,
  CheckBadgeIcon,
  FolderOpenIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { Chip } from "@heroui/chip";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import { Description } from "@/app/check-report/description";
import { Info } from "@/app/check-report/info";
import { PriorityChipColor, StatusChipColor } from "@/config/report";
import { Report } from "@/types/report.types";
import { formatLocaleDate } from "@/utils/date";

interface ReportDetailProps {
  report: Report;
  className?: string;
}

export const ReportDetail = ({ report, className }: ReportDetailProps) => {
  const t = useTranslations("CheckReportPage");
  const followUpQuestions = report?.data?.follow_up_questions || [];
  const fullDate = formatLocaleDate(report?.created_at || "", "long");
  const { category, priority, status } = report || {};
  const categoryLabel = t(`category-${category}-text`);
  const priorityLabel = t(`priority-${priority?.toLowerCase()}-text`);
  const statusLabel = t(
    `status-${status?.replaceAll("_", "-").toLowerCase()}-text`,
  );

  return (
    <div className="gap-2 flex flex-col">
      <p className="text-xl font-bold">{report.title}</p>
      <div
        className={clsx(
          "flex flex-wrap space-x-0 gap-x-4 gap-y-2 sm:flex-col sm:gap-y-5 pb-3 pt-1 sm:pt-2",
          className,
        )}
      >
        <Info
          className="items-center"
          Icon={CalendarDaysIcon}
          label="created-at"
        >
          <p className="text-xs text-default-700 font-semibold md:font-normal">
            {fullDate}
          </p>
        </Info>
        <Info className="items-center" Icon={CheckBadgeIcon} label="status">
          <Chip
            size="sm"
            variant="dot"
            className="border-none -ml-2"
            classNames={{
              content: "text-default-700 font-semibold md:font-normal",
            }}
            color={StatusChipColor[status as keyof typeof StatusChipColor]}
          >
            {statusLabel}
          </Chip>
        </Info>
        <Info
          className="items-center"
          Icon={PresentationChartLineIcon}
          label="priority"
        >
          <Chip
            size="sm"
            variant="flat"
            classNames={{
              content: "font-semibold",
            }}
            color={
              PriorityChipColor[priority as keyof typeof PriorityChipColor]
            }
          >
            {priorityLabel}
          </Chip>
        </Info>
        <Info Icon={FolderOpenIcon} className="items-center" label="category">
          <Chip
            classNames={{ content: "font-semibold md:font-normal" }}
            variant="bordered"
            size="sm"
          >
            {categoryLabel}
          </Chip>
        </Info>
      </div>
      <Description
        description={report?.description as string}
        followUpQuestions={followUpQuestions}
      />
    </div>
  );
};
