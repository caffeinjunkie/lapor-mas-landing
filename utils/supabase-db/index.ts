import { createClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";

export async function getSupabaseServer() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error('Supabase credentials not set!');
  }

  return createClient<Database>(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
}