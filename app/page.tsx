"use client";

import React, {
  useEffect,
  useState,
} from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { getLocalTimeZone, now } from "@internationalized/date";
import useSWR from "swr";

import {
  CameraIcon,
  MapIcon,
  RefreshIcon,
} from "@/components/icons";
import { Camera } from "@/components/form/camera";
import { Menu } from "@/components/menu";
import { ReportList } from "@/components/report";
import { Category } from "@/config/complaint-category";
import { Address, findAddress } from "@/utils/google-maps";
import { formatDate } from "@/utils/date";
import { useTranslations } from "next-intl";
import { fetchTasks } from "@/api/tasks";
import { Report } from "@/types/report.types";
import { Spinner } from "@heroui/spinner";
import { getUserPrompt } from "@/utils/prompts";
import useApi from "@/hooks/use-api";
import {
  deleteTemporaryData,
  getTemporaryData,
  saveTemporaryData,
} from "./handlers";
import { MandatoryModal } from "@/components/modals/mandatory-modal";
import { AIModal } from "@/components/modals/ai-modal";

export default function Home() {
  const t = useTranslations("HomePage");
  const [deviceReady, setDeviceReady] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const mandatorySteps = ["info-form", "upload-form"];
  const optionalSteps = ["ai-checking", "ai-checked", "follow-up-form"];
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [currentStep, setCurrentStep] = useState<string>("upload-form");
  // const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [isAddressLoaded, setIsAddressLoaded] = useState<boolean>(true);
  const [isCategoryLocked, setIsCategoryLocked] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const {
    isOpen: isMandatoryModalOpen,
    onOpenChange: onMandatoryModalOpenChange,
    onOpen: onMandatoryModalOpen,
    onClose: onMandatoryModalClose,
  } = useDisclosure();
  const {
    isOpen: isAiModalOpen,
    onOpenChange: onAiModalOpenChange,
    onOpen: onAiModalOpen,
    onClose: onAiModalClose,
  } = useDisclosure();
  const {
    data: aiResponse,
    error: aiError,
    loading: aiLoading,
    fetchData: fetchAiData,
  } = useApi();

  const {
    data: publicReports,
    error: dataError,
    isValidating,
  } = useSWR<Report[]>(["reports"], fetchTasks as any, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  React.useEffect(() => {
    // const fetchPublicReports = async () => {
    //   const { data } = await fetchTasks();

    //   setPublicReports(data as Report[]);
    // };

    // fetchPublicReports();
    refreshLocation();
  }, []);

  useEffect(() => {
    if (!isMandatoryModalOpen) {
      setDeviceReady(false);
      setSelectedCategory(null);
      setIsCategoryLocked(false);
    }
  }, [isMandatoryModalOpen]);

  useEffect(() => {
    if (aiResponse && !aiLoading) {
      setCurrentStep("ai-checked");
      const tempData = getTemporaryData();
      saveTemporaryData({ ...tempData, priority: aiResponse.priority });

      const isNonCritical = selectedCategory?.key === "lainnya";
      const isReportValid =
        (isNonCritical
          ? (aiResponse?.validityScore ?? 0) >= 70
          : (aiResponse?.validityScore ?? 0) >= 80) && !aiResponse.isSpam;
      if (isReportValid) {
        setTimeout(() => {
          setCurrentStep("follow-up-form");
        }, 1000);
      }
    }
  }, [aiResponse]);

  const refreshLocation = () => {
    setIsAddressLoaded(false);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          try {
            const address = await findAddress(latitude, longitude);

            if (address) {
              setAddress(address);
            }
          } catch (err: any) {
            // setError(err.message);
          } finally {
            setIsAddressLoaded(true);
          }
        },
        (err) => {
          // setError(t("failed-to-load-error-text", { message: err.message }));
          setIsAddressLoaded(true);
        },
      );
    } else {
      // setError(t("gps-failed-error-text"));
      setIsAddressLoaded(true);
    }
  };

  const selectMenu = (category: Category) => {
    setSelectedCategory(category);
    onMandatoryModalOpen();
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
        a: answer
      }));
  };

  const onOpenAICheck = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataFromEntries = Object.fromEntries(new FormData(e.currentTarget));
    const submitValue = getUserPrompt(
      dataFromEntries.title as string,
      dataFromEntries.description as string,
      dataFromEntries.category as string,
      dataFromEntries.address as string,
    );
    onMandatoryModalClose();
    onAiModalOpen();
    setCurrentStep("ai-checking");
    console.log(files, 'ax')
    saveTemporaryData({ ...dataFromEntries });
    await fetchAiData(submitValue);
  };

  const handleConfirmPhoto = (file: File) => {
    setFiles([...files, file]);
    setIsCameraOpen(false);
  };

  const onAiModalBack = () => {
    setCurrentStep("info-form");
    onAiModalClose();
    onMandatoryModalOpen();
  };

  const reset = () => {
    setDeviceReady(false);
    setIsCameraOpen(false);
    setCurrentStep("upload-form");
    setFiles([]);
  };

  return (
    <section className="flex flex-col items-center pt-2 min-h-72">
      {/* <Skeleton
        className="rounded-lg"
        isLoaded={isAddressLoaded && (address !== null || error !== null)}
      >
        <Button
          color={address ? "default" : "warning"}
          startContent={address ? <MapIcon /> : <RefreshIcon />}
          variant="light"
          onPress={refreshLocation}
        >
          {address
            ? `${address.adminArea3}`
            : error
              ? t(error)
              : t("fetch-location-failed-error-text")}
        </Button>
      </Skeleton> */}
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-2 md:py-10">
        <Menu onMenuPress={selectMenu} />
        <ReportList
          title={t("newest-reports-text")}
          isEmpty={isValidating || publicReports?.length === 0}
        >
          {isValidating && <Spinner />}
          {!isValidating && publicReports?.length === 0 && (
            <ReportList.Empty value={t("empty-text")} />
          )}
          {!isValidating &&
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
            onSubmit={onOpenAICheck}
            address={address}
            isCategoryLocked={isCategoryLocked}
            setCurrentStep={setCurrentStep}
            files={files}
            setFiles={setFiles}
            onCameraOpen={onCameraOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <AIModal
            isOpen={isAiModalOpen}
            onClose={() => {
              reset();
              deleteTemporaryData();
              onAiModalClose();
            }}
            onOpenChange={onAiModalOpenChange}
            t={t}
            isNonCriticalType={selectedCategory?.key === "lainnya"}
            aiResponse={aiResponse}
            isLoading={aiLoading}
            currentStep={currentStep}
            onBack={onAiModalBack}
            onSubmit={onReportSubmit}
          />
          {isCameraOpen && (
            <Camera
              onClose={() => setIsCameraOpen(false)}
              deviceReady={deviceReady}
              onConfirm={handleConfirmPhoto}
              setDeviceReady={setDeviceReady}
            />
          )}
          <div className="w-full fixed flex justify-center bottom-0 pt-4 pb-10 left-0">
            <Button
              color="primary"
              radius="full"
              size="lg"
              startContent={<CameraIcon />}
              variant="shadow"
              onPress={onMandatoryModalOpen}
            >
              {t("create-report-cta-text")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
