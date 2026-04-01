import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/portal";

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  "https://iaurirqrosjdselfepqi.supabase.co";
const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ??
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdXJpcnFyb3NqZHNlbGZlcHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzY4MjEsImV4cCI6MjA5MDQ1MjgyMX0.ldEz_1RpdfLpeOGJurFtQmbwvsrGUO3frWvhLhaldVU";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
