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

import { CameraIcon, MapIcon, RefreshIcon } from "@/components/icons";
import { Camera } from "@/components/camera";
import Menu from "@/components/menu";
import CaseList from "@/components/case-list";

export default function Home() {
  const cameraRef = React.useRef<CameraType>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const [deviceReady, setDeviceReady] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState<string | null>(null);
  const [isCoordinatesLoaded, setIsCoordinatesLoaded] =
    React.useState<boolean>(true);
  const [complaintCategory, setComplaintCategory] = React.useState<string>("");

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  React.useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setDeviceReady(false);
    }
  }, [isOpen]);

  const refreshLocation = () => {
    setIsCoordinatesLoaded(false);
    setTimeout(() => {
      setCoordinates("abcd");
      setIsCoordinatesLoaded(true);
    }, 1000);
  };

  const takePhoto = () => {
    if (cameraRef.current) {
      const photo = cameraRef.current.takePhoto();

      setImage(photo as string);
    }
  };

  const retakePhoto = () => {
    setImage(null);
  };

  const selectMenu = (menuLabel: string) => {
    setComplaintCategory(menuLabel);
    console.log(menuLabel);
    onOpen();
  };

  return (
    <section className="flex flex-col items-center pt-2">
      <Skeleton className="rounded-lg" isLoaded={isCoordinatesLoaded}>
        <Button
          color={coordinates ? "default" : "warning"}
          startContent={coordinates ? <MapIcon /> : <RefreshIcon />}
          variant="light"
          onPress={refreshLocation}
        >
          {coordinates ? "Sukolilo" : "Mual ulang lokasi"}
        </Button>
      </Skeleton>
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-2 md:py-10">
        <Menu onMenuPress={selectMenu} />
        <CaseList></CaseList>
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
                    <Camera
                      ref={cameraRef}
                      deviceReady={deviceReady}
                      image={image}
                      setDeviceReady={setDeviceReady}
                    />
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
                        startContent={<RefreshIcon />}
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
          <div className="w-full fixed flex justify-center bottom-[36] left-0">
            <Button
              color="danger"
              radius="full"
              variant="shadow"
              onPress={onOpen}
              startContent={<CameraIcon />}
            >
              Lapor Sekarang!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
