import supabase from "@/utils/supabase-db";

export const fetchAllAdmins = async () => {
  const { data, error, count } = await supabase
    .from("admins")
    .select("*", { count: "exact" })
    .is("is_hidden", false)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return { data, count };
};
