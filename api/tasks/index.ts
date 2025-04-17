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
  files: File[];
  category: string;
  followUpQuestions: string[];
  address: string;
  priority: string;
};

export const createTask = async ({
  title,
  description,
  category,
  followUpQuestions,
  priority,
  address,
  files,
}: CreateTaskType) => {
  // upload images
  const images = [] as string[];

  // const { data, error } = await supabase
  //   .from("tasks")
  //   .insert({
  //     title,
  //     description,
  //     category,
  //     priority,
  //     status: "PENDING",
  //     tracking_id: "",
  //     images,
  //     data: {
  //       follow_up_questions: followUpQuestions,
  //     }
  //   })
  //   .single();

  // if (error) throw error;

  // return { data };
};

export const fetchTasks = async () => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .range(0, 6)
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

  return { data };
};
