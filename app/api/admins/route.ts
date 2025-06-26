import { NextResponse } from "next/server";

import supabase from "@/utils/supabase-db";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { data, error, count } = await supabase
            .from("admins")
            .select("*", { count: "exact" })
            .is("is_hidden", false)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return NextResponse.json({ data, count });
    } catch (error) {
        console.error('Error fetching admins:', error);
        return NextResponse.json(
            { error: 'Failed to fetch admins' },
            { status: 500 }
        );
    }
}