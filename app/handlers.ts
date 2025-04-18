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
  return getFromSessionStorage("temporaryData")[0];
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
  mutateReports: KeyedMutator<Report[]>,
  closeModal: () => void,
  setIsSubmitLoading: (isLoading: boolean) => void,
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

    await createTask({
      title: payload.title,
      description: payload.description,
      category: payload.category,
      followUpQuestions,
      priority: payload.priority,
      address: payload.address,
      images: imgUrls,
    });
    await mutateReports();
  } catch (error) {
    console.error(error);
  } finally {
    deleteTemporaryData();
    closeModal();
    setIsSubmitLoading(false);
  }
};
