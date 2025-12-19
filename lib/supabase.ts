import { createClient, SupabaseClient } from "@supabase/supabase-js";

// These should be set in environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Check if credentials are valid (not placeholders)
const hasValidCredentials =
  supabaseUrl.startsWith("http") && supabaseAnonKey.length > 20;

// Only create client if valid credentials are provided
export const supabase: SupabaseClient | null = hasValidCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
