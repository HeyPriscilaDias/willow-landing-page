import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendFormNotification } from "@/lib/resend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

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

    // Insert email into newsletter_signups table
    const { error } = await supabase
      .from("newsletter_signups")
      .insert({
        email: email.trim().toLowerCase(),
        created_at: new Date().toISOString(),
      });

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

    // Send email notification
    await sendFormNotification({
      formName: "Newsletter Signup",
      data: {
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
