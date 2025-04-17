import React, { useRef, useState } from "react";
import { CameraType, Camera as CameraView } from "react-camera-pro";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { CameraIcon, CheckIcon } from "../icons";
import { base64ToBlob, compressImage } from "@/utils/image";
import { useTranslations } from "next-intl";

type CameraProps = {
  deviceReady: boolean;
  setDeviceReady: (deviceReady: boolean) => void;
  onConfirm: (file: File) => void;
  onClose: () => void;
};

export const Camera = ({
  deviceReady,
  setDeviceReady,
  onConfirm,
  onClose,
}: CameraProps) => {
  const cameraRef = useRef<CameraType>(null);
  const t = useTranslations("UploadForm");
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  const onTakePhoto = async () => {
    if (cameraRef.current) {
      const photo = cameraRef.current.takePhoto();
      setImage(photo as string);
    }
  };

  const onConfirmPhoto = async () => {
    if (!image) return;
    const blob = base64ToBlob(image as string, "image/jpeg");
    const compressedBlob = (await compressImage(blob, 1000)) as Blob;
    const fileName = `${Date.now()}.jpg`;
    const file = new File([compressedBlob], fileName, { type: "image/jpeg" });
    setDeviceReady(false);

    onConfirm(file);
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 w-full flex flex-col items-center justify-center z-[9999]">
      {!deviceReady && (
        <div className="flex w-full justify-center items-center">
          <Spinner />
        </div>
      )}
      <>
        {!image && (
          <CameraView
            ref={cameraRef}
            aspectRatio="cover"
            errorMessages={{
              noCameraAccessible: t("camera-not-accessible"),
              permissionDenied: t("camera-permission-denied"),
              switchCamera: t("camera-switch-camera"),
              canvas: t("camera-canvas-error"),
            }}
            facingMode="environment"
            videoReadyCallback={() => {
              setDeviceReady(true);
              setIsLoading(false);
            }}
          />
        )}
        {image && <img src={image} className="w-full h-screen" />}
        {!isLoading && (
          <div className="fixed top-0 w-full z-10 flex justify-end p-2">
            <Button
              onPress={() => {
                setDeviceReady(false);
                onClose();
              }}
              variant="light"
              className="bg-default-200/20 col-start-1 max-w-12"
            >
              {t("cancel-text")}
            </Button>
          </div>
        )}

        {!isLoading && (
          <div className="fixed bottom-0 w-full z-10 flex items-center box-border py-8 px-4">
            <Button
              isIconOnly
              onPress={image ? onConfirmPhoto : onTakePhoto}
              className="mx-auto"
              size="lg"
              startContent={
                image ? <CheckIcon size={24} /> : <CameraIcon size={24} />
              }
              radius="full"
              color={image ? "success" : "danger"}
            />
          </div>
        )}
      </>
    </div>
  );
};

Camera.displayName = "Camera";
