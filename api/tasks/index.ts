import supabase from "@/utils/supabase-db";

export type SortType = {
  field: "created_at" | "title" | "priority";
  order: "asc" | "desc";
};

export type FilterType = {
  field: "category" | "priority" | "startDate" | "endDate" | "pic";
  value: string[] | string;
};

export const fetchTasks = async () => {
  const { data, count, error } = await supabase
    .from("tasks")
    .select("*", { count: "exact" })
    .range(0, 6)
    .order("created_at", { ascending: false })
    .eq("status", "PENDING");


  return { data, count, error };
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