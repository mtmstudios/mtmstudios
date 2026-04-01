import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/portal";

// Production Supabase project: Dashboard MTM Studios (iaurirqrosjdselfepqi)
const PROD_URL = "https://iaurirqrosjdselfepqi.supabase.co";
const PROD_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhdXJpcnFyb3NqZHNlbGZlcHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NzY4MjEsImV4cCI6MjA5MDQ1MjgyMX0.ldEz_1RpdfLpeOGJurFtQmbwvsrGUO3frWvhLhaldVU";

const envUrl = (import.meta.env.VITE_SUPABASE_URL as string) ?? "";
const envKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ??
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ??
  "";

// Force production project — override stale env if pointing to old project
const supabaseUrl = envUrl.includes("imcckwxaowthapjpxtym") ? PROD_URL : (envUrl || PROD_URL);
const supabaseAnonKey = envUrl.includes("imcckwxaowthapjpxtym") ? PROD_KEY : (envKey || PROD_KEY);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
