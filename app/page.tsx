"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { CameraType } from "react-camera-pro";
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

import { CameraIcon, MapIcon, RefreshIcon } from "@/components/icons";
import { Camera } from "@/components/form/camera";
import { Menu } from "@/components/menu";
import { ReportList } from "@/components/report";
import { Category } from "@/config/complaint-category";
import { Address, findAddress } from "@/utils/google-maps";
import { ComplaintForm } from "@/components/form/complaint-form";
import { formatDate } from "@/utils/date";
import { useTranslations } from "next-intl";
import { fetchTasks } from "@/api/tasks";
import { Report } from "@/types/report.types";
import { Spinner } from "@heroui/spinner";
import { UploadForm } from "@/components/form/upload-form";

export default function Home() {
  const t = useTranslations("HomePage");
  const cameraRef = useRef({ current: null } as { current: CameraType | null });
  const [image, setImage] = useState<string | null>(null);
  const [deviceReady, setDeviceReady] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const mandatorySteps = ["info-form", "upload-form"];
  const optionalSteps = ["follow-up-form"];
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isStep2, setIsStep2] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<string>("upload-form");
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [isAddressLoaded, setIsAddressLoaded] = useState<boolean>(true);
  const [isCategoryLocked, setIsCategoryLocked] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

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

  React.useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setDeviceReady(false);
      setIsStep2(false);
      setSelectedCategory(null);
      setIsCategoryLocked(false);
    }
  }, [isOpen]);

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
            setError(err.message);
          } finally {
            setIsAddressLoaded(true);
          }
        },
        (err) => {
          setError(t("failed-to-load-error-text", { message: err.message }));
          setIsAddressLoaded(true);
        },
      );
    } else {
      setError(t("gps-failed-error-text"));
      setIsAddressLoaded(true);
    }
  };

  const selectMenu = (category: Category) => {
    setSelectedCategory(category);
    onOpen();
    setIsCategoryLocked(true);
  };

  const onCameraOpen = () => {
    if (files.length > 2) {
      return;
    }
    setIsCameraOpen(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataFromEntries = Object.fromEntries(new FormData(e.currentTarget));
    const enrichedData: any = {
      ...dataFromEntries,
      image,
      category: selectedCategory?.label,
      date: formatDate(now(getLocalTimeZone()).toString()),
    };

    // saveToSessionStorage(enrichedData);
    // update state
  };

  const handleConfirmPhoto = (file: File) => {
    setFiles([...files, file]);
    setIsCameraOpen(false);
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
          <Modal
            isDismissable={false}
            isOpen={isOpen}
            onClose={() => {
              reset();
              onClose();
            }}
            placement="bottom-center"
            onOpenChange={onOpenChange}
          >
            <ModalContent className="transform transition-transform duration-200">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col items-center gap-1">
                    {t(`complaint-form-${currentStep}-title`)}
                  </ModalHeader>
                  <ModalBody className="gap-4">
                    {currentStep === "upload-form" && (
                      <UploadForm
                        onClose={onClose}
                        files={files}
                        onCameraOpen={onCameraOpen}
                        setFiles={
                          setFiles as (
                            files: File[],
                          ) => Dispatch<SetStateAction<File[]>>
                        }
                        onNext={() => setCurrentStep("info-form")}
                      />
                    )}
                    {currentStep === "info-form" && (
                      <ComplaintForm
                        address={address}
                        category={selectedCategory}
                        isCategorySelectionLocked={isCategoryLocked}
                        setCategory={setSelectedCategory}
                        onClose={onClose}
                        files={files}
                        onSubmit={handleSubmit}
                      />
                    )}
                  </ModalBody>
                  {/* {!isStep2 && (
                    <ModalFooter className="flex flex-row items-center justify-between">
                      <Button color="danger" variant="light" onPress={onClose}>
                        {t("create-report-cancel-text")}
                      </Button>
                      {!image && (
                        <Button
                          isIconOnly
                          color="danger"
                          isDisabled={!deviceReady}
                          radius="full"
                          onPress={takePhoto}
                        >
                          <CameraIcon fill="white" />
                        </Button>
                      )}
                      {image && (
                        <Button
                          color="default"
                          startContent={<RefreshIcon />}
                          variant="light"
                          onPress={retakePhoto}
                        >
                          {t("create-report-redo-text")}
                        </Button>
                      )}
                      {!isStep2 && (
                        <Button
                          color="primary"
                          isDisabled={!image}
                          type="submit"
                          variant="light"
                          onPress={() => setIsStep2(true)}
                        >
                          {t("create-report-continue-text")}
                        </Button>
                      )}
                    </ModalFooter>
                  )} */}
                </>
              )}
            </ModalContent>
          </Modal>
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
              onPress={onOpen}
            >
              {t("create-report-cta-text")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
