"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Card, CardFooter } from "@heroui/card";
import { Form } from "@heroui/form";
import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Skeleton } from "@heroui/skeleton";
import { Tab, Tabs } from "@heroui/tabs";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { PhotoSlider } from "react-photo-view";
import useSWR from "swr";

import { Activities } from "./activities";
import { appendParams, isEmptyError } from "./handlers";
import { ReportDetail } from "./report-detail";

import { fetchTaskByTrackingId } from "@/api/tasks";
import { Report } from "@/types/report.types";

export default function CheckReportPage() {
  const t = useTranslations("CheckReportPage");
  const searchParams = useSearchParams();
  const trackingId = searchParams.get("trackingId");
  const pathname = usePathname();
  const router = useRouter();
  const [sliderImages, setSliderImages] = useState<
    {
      src: string;
      key: string;
    }[]
  >([]);
  const [isPhotoSliderOpen, setIsPhotoSliderOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const {
    data: report,
    error: error,
    isValidating: isLoading,
    mutate: mutate,
  } = useSWR<Report>(
    ["report", trackingId],
    () => trackingId && (fetchTaskByTrackingId(trackingId) as any),
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataFromEntries = Object.fromEntries(new FormData(e.currentTarget));
    const param = appendParams({
      trackingId: dataFromEntries["tracking-id"] as string,
    });
    router.replace(`${pathname}?${param}`);
  };

  const onImagePress = (
    images: { src: string; key: string }[],
    index: number,
  ) => {
    setSliderImages(images);
    setIsPhotoSliderOpen(true);
    setImageIndex(index);
  };

  const reportImages: { src: string; key: string }[] =
    report?.images.map((src: string, index: number) => ({
      src,
      key: `image-${index + 1}`,
    })) || [];

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <div className="flex flex-col w-full lg:w-96 rounded-lg gap-2">
          <Form onSubmit={onSubmit}>
            <Input
              type="text"
              label="Tracking ID"
              defaultValue={trackingId || ""}
              name="tracking-id"
              id="tracking-id"
            />
            <Button color="primary" type="submit" className="w-full">
              {t("check-report-cta-text")}
            </Button>
          </Form>
        </div>
        <Skeleton isLoaded={!isLoading} className="w-full h-full rounded-xl">
          <div className="flex flex-col w-full">
            {!report && !trackingId && (
              <div className="min-h-64 lg:h-full rounded-xl bg-gray-400/10 flex items-center justify-center">
                <p>{t("check-report-default-text")}</p>
              </div>
            )}
            {!report && trackingId && (
              <div className="min-h-64 lg:h-full rounded-xl bg-gray-400/10 flex items-center justify-center">
                <p>{t("check-report-empty-text")}</p>
              </div>
            )}
            {error && !isEmptyError(error as unknown) && trackingId && (
              <div className="min-h-64 lg:h-full rounded-xl bg-gray-400/10 flex flex-col gap-3 justify-center items-center">
                <p>{t("check-report-error-text")}</p>
                <Button
                  color="primary"
                  className="w-fit"
                  startContent={<ArrowPathIcon className="w-5 h-5" />}
                  onPress={() => mutate()}
                >
                  {t("check-report-try-again-text")}
                </Button>
              </div>
            )}
            {report && (
              <div className="flex flex-col gap-8 w-full">
                <ReportDetail report={report as Report} />
                <div
                  className={clsx(
                    "flex flex-col z-30 gap-4 w-full",
                    "transition-all duration-300 ease-in-out",
                  )}
                >
                  <Tabs
                    size="md"
                    aria-label="Report detail tabs"
                    color="default"
                    variant="underlined"
                    classNames={{
                      panel: "pb-4",
                    }}
                    className="font-semibold"
                  >
                    <Tab value="activities" title={t("activities-tab-text")}>
                      <Activities
                        data={report?.progress || []}
                        onImagePress={onImagePress}
                        users={[]}
                      />
                    </Tab>
                    <Tab value="attachments" title={t("attachments-tab-text")}>
                      {reportImages.length === 0 && (
                        <p className="flex justify-center w-full px-4 text-default-500 text-sm">
                          {t("no-attachments-text")}
                        </p>
                      )}
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 gap-2">
                        {reportImages.map(({ src }, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.2,
                              ease: "easeInOut",
                            }}
                          >
                            <Card
                              isPressable
                              onPress={() => onImagePress(reportImages, index)}
                              isFooterBlurred
                              className="border-none w-full shadow-sm hover:scale-105"
                            >
                              <Image
                                removeWrapper
                                loading="lazy"
                                width={120}
                                height={120}
                                className="object-cover w-full"
                                src={src}
                                alt={src + index}
                              />
                              <CardFooter className="absolute h-6 bg-white/30 bottom-0 z-10 justify-between">
                                <p className="w-full text-xs text-center line-clamp-1">{`attachment ${index + 1}`}</p>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
        </Skeleton>
      </div>
      <PhotoSlider
        images={sliderImages}
        index={imageIndex}
        visible={isPhotoSliderOpen}
        onIndexChange={setImageIndex}
        onClose={() => setIsPhotoSliderOpen(false)}
      />
    </div>
  );
}
