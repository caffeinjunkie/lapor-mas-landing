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
import { categories, Category } from "@/config/complaint-category";
import { findAddress } from "@/helper/google-maps";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

export default function Home() {
  const cameraRef = React.useRef<CameraType>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const [deviceReady, setDeviceReady] = React.useState(false);
  const [complaintCategory, setComplaintCategory] =
    React.useState<Category | null>(null);
  const [isStep2, setIsStep2] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [shortAddress, setShortAddress] = React.useState<string | null>(null);
  const [isAddressLoaded, setIsAddressLoaded] = React.useState<boolean>(true);
  const [isCategoryLocked, setIsCategoryLocked] =
    React.useState<boolean>(false);

  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  React.useEffect(() => {
    refreshLocation();
  }, []);

  React.useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setDeviceReady(false);
      setIsStep2(false);
      setComplaintCategory(null);
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
            if (address?.adminArea3) {
              setShortAddress(address.adminArea3);
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
    setComplaintCategory(category);
    onOpen();
    setIsCategoryLocked(true);
  };

  const animals = [
    {
      label: "Cat",
      key: "cat",
      description: "The second most popular pet in the world",
    },
    {
      label: "Dog",
      key: "dog",
      description: "The most popular pet in the world",
    },
    {
      label: "Elephant",
      key: "elephant",
      description: "The largest land animal",
    },
    { label: "Lion", key: "lion", description: "The king of the jungle" },
    { label: "Tiger", key: "tiger", description: "The largest cat species" },
    {
      label: "Giraffe",
      key: "giraffe",
      description: "The tallest land animal",
    },
    {
      label: "Dolphin",
      key: "dolphin",
      description: "A widely distributed and diverse group of aquatic mammals",
    },
    {
      label: "Penguin",
      key: "penguin",
      description: "A group of aquatic flightless birds",
    },
    {
      label: "Zebra",
      key: "zebra",
      description: "A several species of African equids",
    },
    {
      label: "Shark",
      key: "shark",
      description:
        "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
      label: "Whale",
      key: "whale",
      description: "Diverse group of fully aquatic placental marine mammals",
    },
    {
      label: "Otter",
      key: "otter",
      description: "A carnivorous mammal in the subfamily Lutrinae",
    },
    {
      label: "Crocodile",
      key: "crocodile",
      description: "A large semiaquatic reptile",
    },
  ];

  return (
    <section className="flex flex-col items-center pt-2">
      <Skeleton
        className="rounded-lg"
        isLoaded={isAddressLoaded && (shortAddress !== null || error !== null)}
      >
        <Button
          color={shortAddress ? "default" : "warning"}
          startContent={shortAddress ? <MapIcon /> : <RefreshIcon />}
          variant="light"
          onPress={refreshLocation}
        >
          {shortAddress
            ? `${shortAddress}`
            : error
              ? `${error}`
              : "Mual ulang lokasi"}
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
                            isDisabled={isCategoryLocked}
                            defaultSelectedKeys={[
                              complaintCategory?.label || "",
                            ]}
                            label="Kategori Laporan"
                            onChange={(event) => {
                              setComplaintCategory({
                                label: event.target.value,
                                addressRequired: categories.filter(
                                  ({ label }) => label === event.target.value,
                                )[0].addressRequired,
                              });
                            }}
                            placeholder="Pilih kategori laporan"
                          >
                            {Object.entries(categories).map((category) => (
                              <SelectItem key={category[1].label}>
                                {category[1].label}
                              </SelectItem>
                            ))}
                          </Select>
                          {complaintCategory?.addressRequired && (
                            <Autocomplete
                              isRequired
                              defaultItems={animals}
                              label="Alamat Kejadian"
                              placeholder="Search an animal"
                            >
                              {(animal) => (
                                <AutocompleteItem key={animal.key}>
                                  {animal.label}
                                </AutocompleteItem>
                              )}
                            </Autocomplete>
                          )}
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
              color="primary"
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
