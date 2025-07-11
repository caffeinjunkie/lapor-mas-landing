"use client";

import { Button } from "@heroui/button";
import { useDisclosure } from "@heroui/modal";
import { Skeleton } from "@heroui/skeleton";
import { Spinner } from "@heroui/spinner";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import {
  deleteTemporaryData,
  getCoordinates,
  getTemporaryData,
  handleCreateTask,
  handleInternalChecking,
  saveCoordinates,
  saveTemporaryData,
} from "./handlers";

import { fetchAnnouncements } from "@/api/announcements";
import { fetchLocation } from "@/api/location";
import { fetchTasks } from "@/api/tasks";
import { Carousel } from "@/components/carousel";
import { Camera } from "@/components/form/camera";
import { CameraIcon, MapIcon, RefreshIcon } from "@/components/icons";
import { Menu } from "@/components/menu";
import { CheckingModal } from "@/components/modals/checking-modal";
import { MandatoryModal } from "@/components/modals/mandatory-modal";
import { ResultModal } from "@/components/modals/result-modal";
import { ReportList } from "@/components/report";
import { Category } from "@/config/complaint-category";
import useApi from "@/hooks/use-api";
import { Announcement } from "@/types/announcement.types";
import { Report, ReportPayload } from "@/types/report.types";
import { getUserPrompt } from "@/utils/prompts";
import { getStrictness } from "@/utils/string";

export default function Home() {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const coordinates = getCoordinates();
  const [deviceReady, setDeviceReady] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [currentStep, setCurrentStep] = useState<string>("upload-form");
  const [geoLocError, setGeoLocError] = useState<string | null>(null);
  const [address, setAddress] = useState<Report["address"] | null>(null);
  const [isCategoryLocked, setIsCategoryLocked] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isGeoLoading, setIsGeoLoading] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [isMapPinpointLoaded, setIsMapPinpointLoaded] =
    useState<boolean>(false);
  const {
    isOpen: isMandatoryModalOpen,
    onOpenChange: onMandatoryModalOpenChange,
    onOpen: onMandatoryModalOpen,
    onClose: onMandatoryModalClose,
  } = useDisclosure();
  const {
    isOpen: isCheckingModalOpen,
    onOpenChange: onCheckingModalOpenChange,
    onOpen: onCheckingModalOpen,
    onClose: onCheckingModalClose,
  } = useDisclosure();
  const {
    isOpen: isResultModalOpen,
    onOpenChange: onResultModalOpenChange,
    onOpen: onResultModalOpen,
    onClose: onResultModalClose,
  } = useDisclosure();
  const {
    data: aiResponse,
    error: aiError,
    loading: aiLoading,
    fetchData: fetchAiData,
  } = useApi();
  const {
    data: annoucements,
    error: annoucementsError,
    isValidating: isAnnoucementsLoading,
  } = useSWR<Announcement[]>(["annoucements"], fetchAnnouncements as any, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: publicReports,
    error: dataError,
    isValidating: isReportsLoading,
    mutate: mutateReports,
  } = useSWR<Report[]>(["reports"], fetchTasks as any, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    data: mapData,
    error: mapError,
    isValidating: isMapLoading,
    mutate: mutateMap,
  } = useSWR(
    coordinates?.lat && coordinates?.lng
      ? ["map", coordinates.lat, coordinates.lng]
      : null,
    ([_, lat, lng]) => fetchLocation(lat, lng),
    {
      dedupingInterval: 60000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onErrorRetry: (_, __, ___, revalidate, { retryCount }) => {
        if (retryCount >= 3) return;
        setTimeout(() => revalidate({ retryCount }), 1000);
      },
    },
  );

  const setLocation = () => {
    setIsGeoLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          saveCoordinates({
            lat: latitude.toString(),
            lng: longitude.toString(),
          });
          mutateMap();
          setIsGeoLoading(false);
        },
        (err) => {
          err && setGeoLocError("missing-coordinates-error-text");
          setIsGeoLoading(false);
        },
      );
    }
  };

  useEffect(() => {
    setLocation();
  }, []);

  useEffect(() => {
    if (!isMapLoading && !isGeoLoading) {
      setIsMapPinpointLoaded(true);
    }
  }, [isMapLoading, isGeoLoading]);

  useEffect(() => {
    if (!isMandatoryModalOpen) {
      setDeviceReady(false);
      setSelectedCategory(null);
      setIsCategoryLocked(false);
    }
  }, [isMandatoryModalOpen]);

  useEffect(() => {
    const tempData = getTemporaryData();
    if (aiResponse && aiResponse.externalIssue && !aiLoading) {
      setCurrentStep(
        `external-issue-${aiResponse.externalIssue.toLowerCase().replaceAll("_", "-")}`,
      );
      return;
    }
    if (aiResponse && !aiResponse.externalIssue && !aiLoading) {
      setCurrentStep("ai-checked");

      const isReportValid =
        aiResponse.validityScore >= getStrictness(tempData?.category || "") &&
        !aiResponse.isSpam;
      if (isReportValid) {
        setTimeout(() => {
          setCurrentStep("follow-up-form");
        }, 1000);
      }
    }
  }, [aiResponse]);

  const selectMenu = (category: Category) => {
    setSelectedCategory(category);
    onReportCollectingStart();
    setIsCategoryLocked(true);
  };

  const onCameraOpen = () => {
    if (files.length > 2) {
      return;
    }
    setIsCameraOpen(true);
  };

  const onReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tempData = getTemporaryData();
    const fuQnA = Object.fromEntries(new FormData(e.currentTarget));
    const followUpQuestions = Object.entries(fuQnA)
      .filter(([_, answer]) => answer !== "")
      .map(([question, answer]) => ({
        q: question,
        a: answer.toString(),
      }));

    const coordinates = getCoordinates();

    const payload = {
      ...tempData,
      priority: aiResponse?.priority,
      address: {
        full_address: address?.full_address,
        village: address?.village,
        district: address?.district,
        lat: coordinates?.lat,
        lng: coordinates?.lng,
      },
    };

    handleCreateTask(
      payload as ReportPayload,
      followUpQuestions,
      files,
      setTrackingId,
      mutateReports,
      onResultModalOpen,
      onCheckingModalClose,
      setIsSubmitLoading,
    );
  };

  const onCheckReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataFromEntries = Object.fromEntries(new FormData(e.currentTarget));
    const reportContext = handleInternalChecking(
      dataFromEntries.title as string,
      dataFromEntries.description as string,
    );
    onMandatoryModalClose();
    onCheckingModalOpen();
    if (reportContext === "UNKNOWN") {
      handleAICheck(dataFromEntries as Record<string, string>);
      return;
    }
    setCurrentStep(
      `external-issue-${reportContext.toLowerCase().replaceAll("_", "-")}`,
    );
  };

  const handleAICheck = async (dataFromEntries: Record<string, string>) => {
    const submitValue = getUserPrompt(
      dataFromEntries.title as string,
      (dataFromEntries.description as string) ||
        (selectedCategory?.key as string),
      dataFromEntries.category as string,
      dataFromEntries.address as string,
    );
    setCurrentStep("ai-checking");
    saveTemporaryData({
      title: dataFromEntries.title,
      description: dataFromEntries.description,
      category: selectedCategory?.key as string,
      address: {
        full_address: dataFromEntries.address,
        village: mapData?.village,
        district: mapData?.district,
        lat: mapData?.lat,
        lng: mapData?.lng,
      },
    });
    await fetchAiData(submitValue);
  };

  const handleConfirmPhoto = (file: File) => {
    setFiles([...files, file]);
    setIsCameraOpen(false);
  };

  const onCheckingModalBack = () => {
    setCurrentStep("info-form");
    onCheckingModalClose();
    onMandatoryModalOpen();
  };

  const reset = () => {
    setDeviceReady(false);
    setIsCameraOpen(false);
    setCurrentStep("upload-form");
    setFiles([]);
  };

  const onReportCollectingStart = () => {
    onMandatoryModalOpen();
    const fullAddress = `${mapData?.data?.village}, ${mapData?.data?.district}, ${mapData?.data?.regency}, ${mapData?.data?.province}, ${mapData?.data?.code}`;
    const isFullAddressValid = !fullAddress.includes("undefined");
    setAddress({
      full_address: isFullAddressValid ? fullAddress : "",
      village: mapData?.data?.village || "",
      district: mapData?.data?.district || "",
      lat: mapData?.data?.lat || "",
      lng: mapData?.data?.lng || "",
    });
  };

  return (
    <section className="flex flex-col items-center pt-2 min-h-72">
      <Skeleton className="rounded-lg" isLoaded={isMapPinpointLoaded}>
        <Button
          color={mapData?.data ? "default" : "warning"}
          startContent={mapData?.data ? <MapIcon /> : <RefreshIcon />}
          variant="light"
          onPress={setLocation}
        >
          {mapData?.data
            ? `${mapData.data.village}`
            : mapError || geoLocError
              ? t(mapError?.message || geoLocError)
              : t("fetch-location-refresh-text")}
        </Button>
      </Skeleton>
      {!isAnnoucementsLoading &&
        annoucements &&
        !annoucementsError &&
        annoucements.length > 0 && (
          <div className="w-full flex min-h-48 px-8 py-2">
            <Carousel data={annoucements} />
          </div>
        )}
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-2 md:py-10">
        <Menu onMenuPress={selectMenu} />
        <ReportList
          title={t("newest-reports-text")}
          isEmpty={isReportsLoading || publicReports?.length === 0}
          isError={dataError}
        >
          {isReportsLoading && <Spinner />}
          {!isReportsLoading && publicReports?.length === 0 && (
            <ReportList.Empty value={t("empty-text")} />
          )}
          {!isReportsLoading &&
            publicReports &&
            publicReports.map((item: Report, index: number) => (
              <ReportList.Item key={index} item={item} />
            ))}
        </ReportList>
        <div className="flex gap-3">
          <MandatoryModal
            isOpen={isMandatoryModalOpen}
            onClose={() => {
              reset();
              onMandatoryModalClose();
            }}
            onOpenChange={onMandatoryModalOpenChange}
            t={t}
            currentStep={currentStep}
            onSubmit={onCheckReport}
            address={address}
            isCategoryLocked={isCategoryLocked}
            setCurrentStep={setCurrentStep}
            files={files}
            setFiles={setFiles}
            onCameraOpen={onCameraOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <CheckingModal
            isOpen={isCheckingModalOpen}
            isSubmitLoading={isSubmitLoading}
            onClose={() => {
              reset();
              deleteTemporaryData();
              onCheckingModalClose();
            }}
            onOpenChange={onCheckingModalOpenChange}
            t={t}
            isError={aiError}
            aiResponse={aiResponse}
            isLoading={aiLoading}
            currentStep={currentStep}
            onBack={onCheckingModalBack}
            onSubmit={onReportSubmit}
          />
          <ResultModal
            isOpen={isResultModalOpen}
            trackingId={trackingId || ""}
            onClose={() => {
              reset();
              onResultModalClose();
            }}
            onSubmit={() => {
              reset();
              onResultModalClose();
              router.push(`/check-report?trackingId=${trackingId}`);
            }}
            onOpenChange={onResultModalOpenChange}
            t={t}
          />
          {isCameraOpen && (
            <Camera
              onClose={() => setIsCameraOpen(false)}
              deviceReady={deviceReady}
              onConfirm={handleConfirmPhoto}
              setDeviceReady={setDeviceReady}
            />
          )}
          <div className="w-full fixed flex justify-center bottom-0 pt-4 pb-7 left-0">
            <Button
              color="primary"
              radius="full"
              size="lg"
              startContent={<CameraIcon />}
              variant="shadow"
              onPress={onReportCollectingStart}
            >
              {t("create-report-cta-text")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

Home.displayName = "Home";
