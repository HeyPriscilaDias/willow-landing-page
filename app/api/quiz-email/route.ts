import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, personalityTypeId } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if Supabase client is available
    if (!supabase) {
      console.error("Supabase client not initialized");
      return NextResponse.json(
        { error: "Database connection not available" },
        { status: 500 }
      );
    }

    // Insert email into quiz_emails table
    const { data, error } = await supabase
      .from("quiz_emails")
      .insert({
        email: email.trim().toLowerCase(),
        personality_type_id: personalityTypeId || null,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      // Check for duplicate email (unique constraint violation)
      if (error.code === "23505") {
        // Email already exists - that's okay, just proceed
        return NextResponse.json({ success: true, duplicate: true });
      }

      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
