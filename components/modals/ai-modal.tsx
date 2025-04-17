import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { InvalidReportIcon, SpamIcon, ValidReportIcon } from "../icons";
import { Button } from "@heroui/button";
import { FollowUpForm } from "../form/follow-up-form";

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  t: (key: string) => string;
  isNonCriticalType: boolean;
  aiResponse: AIResponseType;
  isLoading: boolean;
  currentStep: string;
  isError: boolean;
  onBack: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const AIModal = ({
  isOpen,
  onClose,
  onOpenChange,
  t,
  isNonCriticalType,
  aiResponse,
  isLoading,
  currentStep,
  isError,
  onBack,
  onSubmit,
}: AIModalProps) => {
  const isReportValid =
    (isNonCriticalType
      ? (aiResponse?.validityScore ?? 0) >= 70
      : (aiResponse?.validityScore ?? 0) >= 80) && !aiResponse.isSpam;

  const message =
    aiResponse?.isSpam || false
      ? t("ai-checker-spam-text")
      : isReportValid
        ? t("ai-checker-valid-text")
        : aiResponse?.validationScoreReason;

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
        {() => (
          <>
            <ModalHeader className="flex flex-col items-center gap-1">
              {t(`complaint-form-${currentStep}-title`)}
            </ModalHeader>
            <ModalBody className="gap-4 w-full pb-4 flex flex-col justify-center items-center">
              {!isLoading && isError && (
                <p className="text-danger text-sm w-full text-center">
                  {t("open-ai-error-text")}
                </p>
              )}
              {currentStep === "ai-checking" && isLoading && (
                <>
                  <DotLottieReact
                    autoplay={isLoading}
                    loop={isLoading}
                    className="d-lg-block d-md-block w-72 pb-8"
                    src="https://lottie.host/70f16a77-a19f-4ee6-8ce2-91de5e929c0d/aG88OC2gU9.lottie"
                  />
                  <p className="text-sm">
                    {t(`complaint-form-ai-checking-subtitle`)}
                  </p>
                </>
              )}
              {currentStep === "ai-checked" && !isLoading && aiResponse && (
                <div className="flex flex-col w-full items-center gap-4">
                  {aiResponse.isSpam && <SpamIcon size={56} />}
                  {!isReportValid && <InvalidReportIcon size={56} />}
                  {isReportValid && <ValidReportIcon size={56} />}
                  <p className="font-semibold text-sm text-center">{message}</p>
                  {!isReportValid && (
                    <Button
                      color="default"
                      variant="light"
                      className="w-full"
                      onPress={onBack}
                    >
                      {t("create-report-back-text")}
                    </Button>
                  )}
                </div>
              )}
              {currentStep === "follow-up-form" && aiResponse && (
                <FollowUpForm
                  questions={aiResponse.followUpQuestions}
                  onClose={onClose}
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
