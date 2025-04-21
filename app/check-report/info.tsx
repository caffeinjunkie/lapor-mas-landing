import { IconSvgProps } from "@/types";
import { Tooltip } from "@heroui/tooltip";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface InfoProps extends React.PropsWithChildren {
  Icon: (props: IconSvgProps) => React.ReactNode;
  label: string;
  className?: string;
}

export const Info = ({ Icon, label, children, className }: InfoProps) => {
  const t = useTranslations("CheckReportPage");
  return (
    <div className={clsx("flex flex-row gap-1 w-fit", className)}>
      <div className="flex flex-row gap-1 items-center w-fit sm:w-32">
        <Icon className="w-4 h-4 text-default-500 hidden sm:block" />
        <Tooltip
          className="block sm:hidden"
          content={t(`${label}-info-label`)}
        >
          <Icon className="block sm:hidden w-4 h-4 text-default-500" />
        </Tooltip>
        <p className="text-xs text-default-500 hidden sm:block">
          {t(`${label}-info-label`)}
        </p>
      </div>
      <div className="flex flex-col sm:max-w-[67%]">{children}</div>
    </div>
  );
};

Info.displayName = "Info";
