import { NextResponse } from "next/server";

import supabase from "@/utils/supabase-db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .lte("start_date", today.toISOString())
      .gte("end_date", today.toISOString())
      .order("start_date", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Failed to fetch announcements" },
      { status: 500 },
    );
  }
}
