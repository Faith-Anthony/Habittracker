import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to get current user
export async function getCurrentUserFromSupabase() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Types for database
export interface SupabaseUser {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
}

export interface SupabaseHabit {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  frequency: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface SupabaseCompletion {
  id: string;
  habit_id: string;
  date: string;
  notes: string | null;
  created_at: string;
}
