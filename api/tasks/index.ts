import { QuestionAnswer, Report } from "@/types/report.types";
import { generateSecureCode } from "@/utils/crypto";
import supabase from "@/utils/supabase-db";

export type SortType = {
  field: "created_at" | "title" | "priority";
  order: "asc" | "desc";
};

export type FilterType = {
  field: "category" | "priority" | "startDate" | "endDate" | "pic";
  value: string[] | string;
};

export type CreateTaskType = {
  title: string;
  description: string;
  images: string[];
  category: string;
  followUpQuestions: QuestionAnswer[];
  address: Report["address"];
  priority: string;
};

export const createTask = async ({
  title,
  description,
  category,
  followUpQuestions,
  priority,
  address,
  images,
}: CreateTaskType) => {
  const trackingId = await generateSecureCode();
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title,
      description,
      category,
      priority,
      address,
      status: "PENDING",
      tracking_id: trackingId,
      images,
      data: {
        follow_up_questions: followUpQuestions,
      },
    })
    .single();

  if (error) throw error;

  return trackingId;
};

export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .range(0, 5)
    .order("created_at", { ascending: false })
    .eq("status", "PENDING");

  if (error) throw error;

  return data;
};

export const fetchTaskByTrackingId = async (trackingId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("tracking_id", trackingId)
    .single();

  if (error) throw error;

  return data;
};

export const updateTaskByTrackingId = async (
  trackingId: string,
  data: Record<string, unknown>,
) => {
  const { data: updatedData, error } = await supabase
    .from("tasks")
    .update(data)
    .eq("tracking_id", trackingId)
    .single();

  if (error) throw error;

  return { data: updatedData };
};
