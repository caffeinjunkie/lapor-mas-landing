"use client";

import React from "react";
import { button as buttonStyles } from "@heroui/theme";
import { Camera } from "react-camera-pro";

import { title, subtitle } from "@/components/primitives";
import { Button } from "@heroui/button";

export default function Home() {
  const [numberOfCameras, setNumberOfCameras] = React.useState(0);
  const cameraRef = React.useRef(null);
  const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [image, setImage] = React.useState<string | null>(null);
  const [activeDeviceId, setActiveDeviceId] = React.useState<
    string | undefined
  >(undefined);

  React.useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((i) => i.kind == "videoinput");
      console.log(videoDevices, "devv");
      setDevices(videoDevices);
    })();
  });

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
        <Camera
          ref={cameraRef}
          errorMessages={{
            noCameraAccessible: "Kamera tidak dapat diakses.",
            permissionDenied:
              "Mohon muat ulang dan beri izin menggunakan kamera.",
            switchCamera: "Tidak dapat mengganti kamera.",
            canvas: "Error.",
          }}
          aspectRatio="cover"
          facingMode="environment"
          numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
          videoSourceDeviceId={activeDeviceId}
          videoReadyCallback={() => {
            console.log("Video feed ready.");
          }}
        />
        <Button
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          onPress={() => {
            if (cameraRef.current) {
              const photo = cameraRef.current.takePhoto();
              console.log(photo, "tes");
              setImage(photo as string);
            }
          }}
        >
          Lapor Sekarang!
        </Button>
      </div>
    </section>
  );
}
