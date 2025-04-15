import { Card, CardBody } from "@heroui/card";
import { CameraIcon, FileIcon } from "../icons";
import { useTranslations } from "use-intl";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";

export const UploadForm = ({
  onNext,
  onClose,
  files,
  setFiles,
}: {
  onNext: () => void;
  onClose: () => void;
  files: File[];
  setFiles: (files: File[]) => Dispatch<SetStateAction<File[]>>;
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const t = useTranslations("UploadForm");

  const checkError = (files: File[]) => {
    const hasErrors = files.map((file) => {
      if (file.size > 1000000) {
        return true;
      }
      return false;
    });

    return hasErrors.some((hasError) => hasError);
  };

  const onSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const selectedFiles = Array.from(e.target.files || []) as File[];
    if (selectedFiles.length > 1) {
      return;
    }
    if (checkError([...files, ...selectedFiles])) {
      setFileError(t("file-size-error-message"));
      return;
    }
    setFiles([...files, ...selectedFiles]);
  };

  const onDeleteFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    if (checkError(newFiles)) {
      setFileError(t("file-size-error-message"));
    } else {
      setFileError(null);
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-col gap-4">
      <p className="text-center text-sm">{t("upload-form-subtitle")}</p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 p-2 rounded-xl bg-default-200/20">
        <Card
          className="w-full bg-white/10"
          onPress={() => imageInputRef.current?.click()}
          isPressable
          isDisabled={files.length > 2}
        >
          <CardBody className="flex flex-col items-center gap-2">
            <FileIcon size={20} />
            <p className="text-center text-xs">{t("file-upload")}</p>
          </CardBody>
        </Card>
        <Card
          className="w-full bg-white/10"
          isPressable
          isDisabled={files.length > 2}
        >
          <CardBody className="flex flex-col items-center gap-2">
            <CameraIcon size={20} />
            <p className="text-center text-xs">{t("camera-upload")}</p>
          </CardBody>
        </Card>
      </div>
      <div className="flex flex-wrap gap-2 items-center w-full pb-2">
        {files.map((file, index) => (
          <Chip onClose={() => onDeleteFile(index)} key={index}>
            {file.name}
          </Chip>
        ))}
      </div>
      {fileError && (
        <p className="text-center text-sm text-danger">{fileError}</p>
      )}
      <input
        id="selectImage"
        max={1}
        accept="image/*"
        hidden
        disabled={files.length > 2}
        ref={imageInputRef}
        value=""
        type="file"
        onChange={onSelectFiles}
      />
      <div className="flex w-full justify-between pb-2">
        <Button color="danger" variant="light" onPress={onClose}>
          {t("cancel-text")}
        </Button>
        <Button
          color="primary"
          onPress={onNext}
          isDisabled={files.length === 0}
        >
          {t("continue-text")}
        </Button>
      </div>
    </div>
  );
};
