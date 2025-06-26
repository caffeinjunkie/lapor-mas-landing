import { NextResponse } from "next/server";

import supabase from "@/utils/supabase-db";
import { generateSecureCode } from "@/utils/crypto";

export async function POST(request: Request) {
    try {
      const {
        title,
        description,
        category,
        followUpQuestions,
        priority,
        address,
        images
      } = await request.json();
  
      const trackingId = await generateSecureCode();
      
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title,
          description,
          category,
          priority,
          address,
          status: 'PENDING',
          tracking_id: trackingId,
          images,
          data: { follow_up_questions: followUpQuestions }
        })
        .select()
        .single();
  
      if (error) throw error;
  
      return NextResponse.json({ trackingId });
    } catch (error) {
      console.error('Error creating task:', error);
      return NextResponse.json(
        { error: 'Failed to create task' },
        { status: 500 }
      );
    }
  }

  export async function GET(request: Request) {
    try {
      const url = new URL(request.url);
      const trackingId = url.searchParams.get('trackingId');
      const limit = url.searchParams.get('limit') || '5';
      
      if (trackingId) {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('tracking_id', trackingId)
          .single();
    
        if (error) throw error;
    
        return NextResponse.json(data);
      }
      
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .range(0, parseInt(limit))
        .order('created_at', { ascending: false })
        .eq('status', 'PENDING');
  
      if (error) throw error;
  
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return NextResponse.json(
        { error: 'Failed to fetch tasks' },
        { status: 500 }
      );
    }
  }
  
  export async function PUT(
    request: Request,
    { params }: { params: { trackingId: string } }
  ) {
    try {
      const { trackingId } = params;
      const updateData = await request.json();
      
      const { data, error } = await supabase
        .from('tasks')
        .update(updateData)
        .eq('tracking_id', trackingId)
        .select()
        .single();
  
      if (error) throw error;
  
      return NextResponse.json({ data });
    } catch (error) {
      console.error('Error updating task:', error);
      return NextResponse.json(
        { error: 'Failed to update task' },
        { status: 500 }
      );
    }
  }