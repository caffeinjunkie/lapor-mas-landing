import { uploadImageToServer } from "@/api/pekerja-ai";
import { createTask } from "@/api/tasks";
import { QuestionAnswer, Report } from "@/types/report.types";
import { KeyedMutator } from "swr";

export const saveTemporaryData = (data: Record<string, any>) => {
  sessionStorage.setItem("temporaryData", JSON.stringify(data));
};

export const deleteTemporaryData = () => {
  sessionStorage.removeItem("temporaryData");
};

export const getTemporaryData = () => {
  return JSON.parse(sessionStorage.getItem("temporaryData") || "{}");
};

export const saveCoordinates = (data: Record<string, any>) => {
  sessionStorage.setItem("coordinates", JSON.stringify(data));
};

export const getCoordinates = () => {
  return JSON.parse(sessionStorage.getItem("coordinates") || "{}");
};

export const handleCreateTask = async (
  tempData: Report,
  followUpQuestions: QuestionAnswer[],
  files: File[],
  mutateReports: KeyedMutator<Report[]>,
  closeModal: () => void,
) => {
  let imgUrls = [];

  try {
    if (files.length > 0) {
      for (const file of files) {
        const { url } = await uploadImageToServer(file);
        imgUrls.push(url);
      }
    }
  
    await createTask({
      title: tempData.title,
      description: tempData.description,
      category: tempData.category,
      followUpQuestions,
      priority: tempData.priority,
      address: tempData.address,
      images: imgUrls,
    });
    await mutateReports();
  } catch (error) {
    console.error(error);
  } finally {
    deleteTemporaryData();
    closeModal();
  }
};
