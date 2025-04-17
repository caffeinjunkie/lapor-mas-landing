import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { UploadForm } from "../form/upload-form";
import { Dispatch, SetStateAction } from "react";
import { ComplaintForm } from "../form/complaint-form";
import { getTemporaryData } from "@/app/handlers";
import { Category } from "@/config/complaint-category";
import { Report } from "@/types/report.types";

interface MandatoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  t: (key: string) => string;
  currentStep: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  address: Report["address"] | null;
  isCategoryLocked: boolean;
  setCurrentStep: (step: string) => void;
  files: File[];
  setFiles: (files: File[]) => void;
  onCameraOpen: () => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
}

export const MandatoryModal = ({
  isOpen,
  onClose,
  onOpenChange,
  t,
  currentStep,
  onSubmit,
  address,
  isCategoryLocked,
  setCurrentStep,
  files,
  setFiles,
  onCameraOpen,
  selectedCategory,
  setSelectedCategory,
}: MandatoryModalProps) => {
  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      onClose={onClose}
      placement="bottom-center"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="transform transition-transform duration-200">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1">
              {t(`complaint-form-${currentStep}-title`)}
            </ModalHeader>
            <ModalBody className="gap-4 w-full flex flex-col justify-center items-center">
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
                  title={getTemporaryData().title ?? ""}
                  description={getTemporaryData().description ?? ""}
                  category={selectedCategory}
                  isCategorySelectionLocked={isCategoryLocked}
                  setCategory={setSelectedCategory}
                  onClose={onClose}
                  files={files}
                  onSubmit={onSubmit}
                />
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
