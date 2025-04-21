import { KeyedMutator } from "swr";

import { uploadImageToServer } from "@/api/pekerja-ai";
import { createTask } from "@/api/tasks";
import { QuestionAnswer, Report, ReportPayload } from "@/types/report.types";
import {
  clearSessionStorage,
  getFromSessionStorage,
  saveToSessionStorage,
} from "@/utils/session-storage";

export const saveTemporaryData = (data: Record<string, any>) => {
  saveToSessionStorage("temporaryData", data);
};

export const deleteTemporaryData = () => {
  clearSessionStorage("temporaryData");
};

export const getTemporaryData = () => {
  const data = getFromSessionStorage("temporaryData")
  return data[data.length - 1];
};

export const saveCoordinates = (data: { lat: string; lng: string }) => {
  saveToSessionStorage("coordinates", data);
};

export const getCoordinates = () => {
  return getFromSessionStorage("coordinates")[0];
};

export const handleCreateTask = async (
  payload: ReportPayload,
  followUpQuestions: QuestionAnswer[],
  files: File[],
  setTrackingId: (trackingId: string) => void,
  mutateReports: KeyedMutator<Report[]>,
  openResultModal: (  ) => void,
  closeModal: () => void,
  setIsSubmitLoading: (isLoading: boolean) => void
) => {
  let imgUrls = [];
  setIsSubmitLoading(true);

  try {
    if (files.length > 0) {
      for (const file of files) {
        const { url } = await uploadImageToServer(file);
        imgUrls.push(url);
      }
    }

    const response = await createTask({
      title: payload.title,
      description: payload.description,
      category: payload.category,
      followUpQuestions,
      priority: payload.priority,
      address: payload.address,
      images: imgUrls,
    }) as string;
    setTrackingId(response)
    await mutateReports();
  } catch (error) {
    console.error(error);
  } finally {
    deleteTemporaryData();
    closeModal();
    setIsSubmitLoading(false);
    openResultModal();
  }
};
