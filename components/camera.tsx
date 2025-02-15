import React, { forwardRef } from "react";
import { Camera as CameraView } from "react-camera-pro";
import { Spinner } from "@heroui/spinner";

type CameraProps = {
  image: string | null;
  deviceReady: boolean;
  setDeviceReady: (isReady: boolean) => void;
};

export const Camera = forwardRef(
  ({ image, deviceReady, setDeviceReady }: CameraProps, ref) => (
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
        <CameraView
          ref={ref}
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
            setDeviceReady(true);
          }}
        />
      )}
    </div>
  ),
);

Camera.displayName = "Camera";
