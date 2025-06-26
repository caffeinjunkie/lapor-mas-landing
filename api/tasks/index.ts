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
  const response = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      category,
      followUpQuestions,
      priority,
      address,
      images,
    }),
  });
  return await response.json();
};

export const fetchTasks = async () => {
  const response = await fetch('/api/tasks');
  return await response.json();
};

export const fetchTaskByTrackingId = async (trackingId: string) => {
  const response = await fetch(`/api/tasks?trackingId=${trackingId}`);
  return await response.json();
};

export const updateTaskByTrackingId = async (
  trackingId: string,
  data: Record<string, unknown>,
) => {
  const response = await fetch(`/api/tasks?trackingId=${trackingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};