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

import { CameraIcon, FileIcon, MapIcon, RefreshIcon } from "@/components/icons";
import { Camera } from "@/components/camera";
import Menu from "@/components/menu";
import CaseList from "@/components/case-list";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import { getLocalTimeZone, now } from "@internationalized/date";
import { Select, SelectItem } from "@heroui/select";
import { categories } from "@/config/complaint-category";

export default function Home() {
  const cameraRef = React.useRef<CameraType>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const [deviceReady, setDeviceReady] = React.useState(false);
  // const [coordinates, setCoordinates] = React.useState<string | null>(null);
  const [isCoordinatesLoaded, setIsCoordinatesLoaded] =
    React.useState<boolean>(true);
  const [complaintCategory, setComplaintCategory] = React.useState<string>("");
  const [isStep2, setIsStep2] = React.useState<boolean>(false);

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  React.useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setDeviceReady(false);
      setIsStep2(false);
      setComplaintCategory("");
    }
  }, [isOpen]);

  const [coordinates, setCoordinates] = React.useState<{
    latitude: number | null;
    longitude: number | null;
  }>({
    latitude: null,
    longitude: null,
  });

  const refreshLocation = () => {
    setIsCoordinatesLoaded(false);
    setTimeout(() => {
      setIsCoordinatesLoaded(true);
    }, 1000);
  };

  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(position, "pos");
        },
        (err) => {
          setError(`Error: ${err.message}`);
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

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

  const selectMenu = (menuLabel: string) => {
    setComplaintCategory(menuLabel);
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
                    {!isStep2 && (
                      <Camera
                        ref={cameraRef}
                        deviceReady={deviceReady}
                        image={image}
                        setDeviceReady={setDeviceReady}
                      />
                    )}
                    {isStep2 && (
                      <div className="flex flex-col gap-6">
                        <Form
                          className="w-full max-w-xl flex flex-col gap-4"
                          validationBehavior="native"
                          onSubmit={(e) => {
                            e.preventDefault();
                            onClose();
                          }}
                        >
                          <Input
                            isRequired
                            errorMessage="Mohon masukkan judul laporan."
                            label="Judul"
                            name="title"
                            placeholder="Tulis judul laporan"
                            type="text"
                          />
                          <Textarea
                            label="Deskripsi"
                            placeholder="Tulis deskripsi laporan"
                          />
                          <Select
                            isRequired
                            isDisabled={complaintCategory !== ""}
                            defaultSelectedKeys={[complaintCategory]}
                            label="Kategori Laporan"
                            placeholder="Pilih kategori laporan"
                          >
                            {Object.entries(categories).map((category) => (
                              <SelectItem key={category[1].label}>
                                {category[1].label}
                              </SelectItem>
                            ))}
                          </Select>
                          <DatePicker
                            isReadOnly
                            isDisabled
                            label="Birth date"
                            value={now(getLocalTimeZone())}
                          />
                          <div className="flex flex-row py-4 items-center justify-center gap-1">
                            <FileIcon />
                            <p className="text-small font-medium">
                              File terlampir
                            </p>
                          </div>
                          <div className="flex w-full justify-between pb-2">
                            <Button
                              onPress={onClose}
                              color="danger"
                              variant="light"
                            >
                              Batal
                            </Button>
                            <Button color="primary" type="submit">
                              Simpan
                            </Button>
                          </div>
                        </Form>
                      </div>
                    )}
                  </ModalBody>
                  {!isStep2 && (
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
                      {!isStep2 && (
                        <Button
                          color="primary"
                          isDisabled={!image}
                          variant="light"
                          onPress={() => setIsStep2(true)}
                          type="submit"
                        >
                          Lanjut
                        </Button>
                      )}
                    </ModalFooter>
                  )}
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
