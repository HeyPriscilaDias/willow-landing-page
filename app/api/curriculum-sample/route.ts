import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendFormNotification } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email } = body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
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

    // Insert into curriculum_sample_requests table
    const { error } = await supabase
      .from("curriculum_sample_requests")
      .insert({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save request" },
        { status: 500 }
      );
    }

    // Send email notification
    await sendFormNotification({
      formName: "Curriculum Sample Request",
      data: {
        "First Name": firstName.trim(),
        "Last Name": lastName.trim(),
        Email: email.trim(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
