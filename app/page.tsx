"use client";

import React from "react";
import { CameraType } from "react-camera-pro";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { getLocalTimeZone, now } from "@internationalized/date";

import { CameraIcon, MapIcon, RefreshIcon } from "@/components/icons";
import { Camera } from "@/components/camera";
import { Menu } from "@/components/menu";
import { ReportList } from "@/components/report";
import { Category } from "@/config/complaint-category";
import { Address, findAddress } from "@/utils/google-maps";
import { ComplaintForm } from "@/components/complaint-form";
import {
  getFromSessionStorage,
  saveToSessionStorage,
  SessionData,
} from "@/utils/session-storage";
import { formatDate } from "@/utils/date";
import { useTranslations } from "next-intl";
import { fetchTasks } from "@/api/tasks";
import { Report } from "@/types/report.types";

export default function Home() {
  const t = useTranslations("HomePage");
  const cameraRef = React.useRef<CameraType>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const [deviceReady, setDeviceReady] = React.useState(false);
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);
  const [isStep2, setIsStep2] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [address, setAddress] = React.useState<Address | null>(null);
  const [isAddressLoaded, setIsAddressLoaded] = React.useState<boolean>(true);
  const [isCategoryLocked, setIsCategoryLocked] =
    React.useState<boolean>(false);
  const [publicReports, setPublicReports] = React.useState<Report[]>([]);
  
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  React.useEffect(() => {
    const fetchPublicReports = async () => {
      const { data } = await fetchTasks();

      setPublicReports([]);
    };

    fetchPublicReports();
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
          setError(`Gagal memuat lokasi: ${err.message}`);
          setIsAddressLoaded(true);
        },
      );
    } else {
      setError("GPS tidak terdeteksi.");
      setIsAddressLoaded(true);
    }
  };

  const takePhoto = () => {
    if (cameraRef.current) {
      const photo = cameraRef.current.takePhoto();

      setImage(photo as string);
    }
  };

  const retakePhoto = () => {
    setImage(null);
    setIsStep2(false);
  };

  const selectMenu = (category: Category) => {
    setSelectedCategory(category);
    onOpen();
    setIsCategoryLocked(true);
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

  return (
    <section className="flex flex-col items-center pt-2 min-h-72">
      <Skeleton
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
      </Skeleton>
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-2 md:py-10">
        <Menu onMenuPress={selectMenu} />
        <ReportList title={t("newest-reports-text")} isEmpty={publicReports.length === 0}>
          {publicReports.length === 0 && (
            <ReportList.Empty value={t("empty-text")} />
          )}
          {publicReports &&
            publicReports.map(
              (
                { title, category, created_at, images }: Report,
                index: number,
              ) => (
                <ReportList.Item
                  key={index}
                  category={category}
                  date={created_at}
                  image={images?.[0]}
                  isLast={index === publicReports.length - 1}
                  title={title}
                />
              ),
            )}
        </ReportList>
        <div className="flex gap-3">
          <Modal
            isOpen={isOpen}
            placement="bottom-center"
            onOpenChange={onOpenChange}
          >
            <ModalContent className="transform transition-transform duration-200">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col items-center gap-1">
                    Foto Barang Bukti!
                  </ModalHeader>
                  <ModalBody className="gap-4">
                    {!isStep2 && (
                      <Camera
                        ref={cameraRef}
                        deviceReady={deviceReady}
                        image={image}
                        setDeviceReady={setDeviceReady}
                      />
                    )}
                    {isStep2 && (
                      <ComplaintForm
                        address={address}
                        category={selectedCategory}
                        isCategorySelectionLocked={isCategoryLocked}
                        setCategory={setSelectedCategory}
                        onClose={onClose}
                        onSubmit={handleSubmit}
                      />
                    )}
                  </ModalBody>
                  {!isStep2 && (
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
                  )}
                </>
              )}
            </ModalContent>
          </Modal>
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
