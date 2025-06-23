import { getSupabaseServer } from "@/utils/supabase-db";

export const fetchAnnouncements = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const supabase = await getSupabaseServer();

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    // .lte('start_date', today.toISOString())
    // .gte('end_date', today.toISOString())
    .order("start_date", { ascending: true });

  if (error) throw error;

  return data;
};
