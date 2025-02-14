"use client";

import React from "react";
import { Camera, CameraType } from "react-camera-pro";
import { button as buttonStyles } from "@heroui/theme";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";

import { title, subtitle } from "@/components/primitives";
import { CameraIcon } from "@/components/icons";

export default function Home() {
  const cameraRef = React.useRef<CameraType>(null);
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [image, setImage] = React.useState<string | null>(null);
  const [activeDeviceId, setActiveDeviceId] = React.useState<
    string | undefined
  >(undefined);
  const [deviceReady, setDeviceReady] = React.useState(false);
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  React.useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((i) => i.kind == "videoinput");

      setDevices(videoDevices);
    })();
  });

  React.useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setDeviceReady(false);
    }
  }, [isOpen]);

  const takePhoto = () => {
    if (cameraRef.current) {
      const photo = cameraRef.current.takePhoto();

      setImage(photo as string);
    }
  };

  const retakePhoto = () => {
    setImage(null);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Modal
          isOpen={isOpen}
          placement="bottom-center"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col items-center gap-1">
                  Foto Barang Bukti!
                </ModalHeader>
                <ModalBody className="gap-4">
                  <div className="h-96 rounded-lg flex flex-col items-center justify-center overflow-hidden">
                    {image && (
                      <img
                        alt="hasil"
                        className="bg-no-repeat bg-contain bg-center"
                        src={image as string}
                      />
                    )}
                    {!deviceReady && <Spinner />}
                    {!image && (
                      <Camera
                        ref={cameraRef}
                        aspectRatio="cover"
                        errorMessages={{
                          noCameraAccessible: "Kamera tidak dapat diakses.",
                          permissionDenied:
                            "Mohon muat ulang dan beri izin menggunakan kamera.",
                          switchCamera: "Tidak dapat mengganti kamera.",
                          canvas: "Error.",
                        }}
                        facingMode="environment"
                        videoReadyCallback={() => {
                          console.log("Video devices ready.", devices);
                          setDeviceReady(true);
                        }}
                        videoSourceDeviceId={activeDeviceId}
                      />
                    )}
                  </div>
                </ModalBody>
                <ModalFooter className="flex flex-row items-center justify-between">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Batal
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
                      variant="light"
                      onPress={retakePhoto}
                    >
                      Ulangi
                    </Button>
                  )}
                  <Button color="primary" isDisabled={!image} variant="light">
                    Lanjut
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Button
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          onPress={onOpen}
        >
          Lapor Sekarang!
        </Button>
      </div>
    </section>
  );
}
