import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Snippet } from "@heroui/snippet";

interface ResultModalProps {
  isOpen: boolean;
  trackingId: string;
  onClose: () => void;
  onSubmit: () => void;
  onOpenChange: (isOpen: boolean) => void;
  t: (key: string) => string;
}

export const ResultModal = ({
  isOpen,
  trackingId,
  onClose,
  onOpenChange,
  onSubmit,
  t,
}: ResultModalProps) => {
  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      hideCloseButton
      onClose={onClose}
      placement="bottom-center"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="transform transition-transform duration-200">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1">
              {t(`result-modal-title`)}
            </ModalHeader>
            <ModalBody className="gap-4 w-full pb-4 flex flex-col justify-center items-center">
              <p className="text-sm">
                {t(`result-modal-subtitle`)}
              </p>
              <Snippet size="lg" symbol="" className="text-3xl">
                {trackingId}
              </Snippet>
              <Button
                color="primary"
                className="w-full"
                onPress={onSubmit}
              >
                {t(`result-modal-button-text`)}
              </Button>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};