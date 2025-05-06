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
  const data = getFromSessionStorage("temporaryData");
  return data[data.length - 1];
};

export const saveCoordinates = (data: { lat: string; lng: string }) => {
  saveToSessionStorage("coordinates", data);
};

export const getCoordinates = () => {
  return getFromSessionStorage("coordinates")[0];
};

function checkContext(value: string) {
  if (!value || typeof value !== "string") {
    return "UNKNOWN";
  }

  const lowerCasedValue = value.toLowerCase();

  const sexualAbusePatterns = [
    "pelecehan seksual",
    "kekerasan seksual",
    "pelecehan tubuh",
    "pelecehan fisik",
    "perkosaan",
    "dilecehkan",
    "dicabuli",
    "disentuh paksa",
    "diserang seksual",
    "pelecehan gender",
    "sexual abuse",
    "sexual harassment",
    "sexual violence",
    "pelecehan alat kelamin",
    "pelecehan intim",
    "pelecehan aurat",
  ];

  const kdrtPatterns = [
    "kdrt",
    "kekerasan dalam rumah tangga",
    "kekerasan domestik",
    "kekerasan suami",
    "kekerasan istri",
    "kekerasan pasangan",
    "kekerasan keluarga",
    "kekerasan rumah tangga",
    "korban suami",
    "korban istri",
    "korban pasangan",
    "kdr",
    "kekerasan oleh pasangan",
    "domestic violence",
    "kekerasan dalam rumahtangga",
  ];

  const legalDisputePatterns = [
    "perselisihan warisan",
    "tanah pribadi",
    "sengketa warisan",
    "konflik warisan",
    "masalah warisan",
    "warisan",
    "sengketa tanah",
    "konflik tanah",
    "masalah tanah",
    "sengketa properti",
    "konflik properti",
    "masalah properti",
    "warisan keluarga",
    "legal dispute",
    "property dispute",
    "inheritance conflict",
  ];

  const scamPatterns = [
    "penipuan online",
    "perdagangan digital",
    "penipuan digital",
    "scam",
    "penipuan internet",
    "penipuan e-commerce",
    "penipuan marketplace",
    "penipuan sosmed",
    "penipuan medsos",
    "penipuan fb",
    "penipuan facebook",
    "penipuan ig",
    "penipuan instagram",
    "penipuan whatsapp",
    "penipuan wa",
    "penipuan tiktok",
    "penipuan shopee",
    "penipuan tokopedia",
    "penipuan online shop",
    "digital fraud",
    "online fraud",
  ];

  const adulteryPatterns = [
    "masalah rumah tangga",
    "perselingkuhan",
    "selingkuh",
    "tidak setia",
    "perzinahan",
    "affair",
    "hubungan terlarang",
    "main mata",
    "hubungan gelap",
    "hubungan rahasia",
    "kecurangan pasangan",
    "suami selingkuh",
    "istri selingkuh",
    "pasangan selingkuh",
    "marital problem",
    "cheating",
    "infidelity",
    "hubungan di luar nikah",
  ];

  const unlawfulTerminationPatterns = [
    "masalah pekerjaan pribadi",
    "phk",
    "pemutusan hubungan kerja",
    "dipecat",
    "diberhentikan",
    "dipaksa resign",
    "dikeluarkan",
    "diusir kerja",
    "diberhentikan sepihak",
    "phk sepihak",
    "phk tidak adil",
    "phk ilegal",
    "unlawful termination",
    "wrongful termination",
    "pemecatan tidak adil",
    "dipecat tidak adil",
    "layoff",
    "pemecatan sepihak",
  ];

  const bullyingPatterns = [
    "bullying",
    "perundungan",
    "dibully",
    "merundung",
    "dikerjai",
    "dianiaya",
    "dizalimi",
    "diteror",
    "dihina",
    "diejek",
    "dikucilkan",
    "disingkirkan",
    "diskriminasi",
    "diancam",
    "dintimidasi",
    "dipalak",
    "ditekan",
    "dikeroyok",
    "dikata-katai",
    "diolok-olok",
    "dilecehkan verbal",
    "dihina di media sosial",
    "cyberbullying",
    "perisakan",
  ];

  const mentalDisorderPatterns = [
    "gangguan jiwa",
    "butuh konseling psikologis",
    "depresi",
    "stress",
    "stres",
    "bunuh diri",
    "ingin mati",
    "putus asa",
    "mental breakdown",
    "gangguan mental",
    "sakit jiwa",
    "gangguan psikologis",
    "trauma",
    "konseling",
    "psikolog",
    "psikiater",
    "mental disorder",
    "psychological problem",
    "psychological disorder",
    "anxiety",
    "kecemasan",
    "panic attack",
    "serangan panik",
    "bipolar",
    "skizofrenia",
    "schizophrenia",
  ];

  if (bullyingPatterns.some((pattern) => lowerCasedValue.includes(pattern))) {
    return "BULLYING";
  }
  if (
    sexualAbusePatterns.some((pattern) => lowerCasedValue.includes(pattern))
  ) {
    return "SEXUAL_ABUSE";
  }
  if (kdrtPatterns.some((pattern) => lowerCasedValue.includes(pattern))) {
    return "KDRT";
  }
  if (
    legalDisputePatterns.some((pattern) => lowerCasedValue.includes(pattern))
  ) {
    return "LEGAL_DISPUTE";
  }
  if (scamPatterns.some((pattern) => lowerCasedValue.includes(pattern))) {
    return "SCAM";
  }
  if (adulteryPatterns.some((pattern) => lowerCasedValue.includes(pattern))) {
    return "ADULTERY";
  }
  if (
    unlawfulTerminationPatterns.some((pattern) =>
      lowerCasedValue.includes(pattern),
    )
  ) {
    return "UNLAWFUL_TERMINATION";
  }
  if (
    mentalDisorderPatterns.some((pattern) => lowerCasedValue.includes(pattern))
  ) {
    return "MENTAL_DISORDER";
  }

  return "UNKNOWN";
}

export const handleInternalChecking = (title: string, description: string) => {
  const titleContext = checkContext(title);
  const descriptionContext = checkContext(description);

  let context;
  if (titleContext !== "UNKNOWN" && descriptionContext !== "UNKNOWN") {
    context = descriptionContext;
  } else if (titleContext !== "UNKNOWN") {
    context = titleContext;
  } else if (descriptionContext !== "UNKNOWN") {
    context = descriptionContext;
  } else {
    context = "UNKNOWN";
  }

  return context;
};

export const handleCreateTask = async (
  payload: ReportPayload,
  followUpQuestions: QuestionAnswer[],
  files: File[],
  setTrackingId: (trackingId: string) => void,
  mutateReports: KeyedMutator<Report[]>,
  openResultModal: () => void,
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

    const response = (await createTask({
      title: payload.title,
      description: payload.description,
      category: payload.category,
      followUpQuestions,
      priority: payload.priority,
      address: payload.address,
      images: imgUrls,
    })) as string;
    setTrackingId(response);
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
