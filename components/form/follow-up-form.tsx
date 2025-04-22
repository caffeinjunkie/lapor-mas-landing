import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { useTranslations } from "next-intl";

interface FollowUpFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  questions: string[];
  onClose: () => void;
  isLoading: boolean;
}

export const FollowUpForm = ({
  onSubmit,
  questions,
  isLoading,
  onClose,
}: FollowUpFormProps) => {
  const t = useTranslations("FollowUpForm");
  return (
    <Form onSubmit={onSubmit} className="w-full pt-4 gap-8">
      <div className="flex flex-col gap-4 w-full">
        {questions.map((question) => (
          <Textarea
            labelPlacement="outside"
            placeholder={t("answer-text")}
            classNames={{
              inputWrapper: "flex-grow h-fit",
            }}
            maxLength={100}
            key={question}
            label={question}
            name={question}
            type="text"
          />
        ))}
      </div>
      <div className="flex flex-row w-full gap-2 justify-between">
        <Button
          className="w-full"
          color="danger"
          variant="light"
          onPress={onClose}
        >
          {t("cancel-text")}
        </Button>
        <Button
          className="w-full"
          color="primary"
          isLoading={isLoading}
          type="submit"
        >
          {t("submit-text")}
        </Button>
      </div>
    </Form>
  );
};
