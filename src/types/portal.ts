// ─── Supabase DB Types ─────────────────────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      n8n_errors: {
        Row: N8nError;
        Insert: Omit<N8nError, "id" | "created_at">;
        Update: Partial<Omit<N8nError, "id" | "created_at">>;
      };
      call_stats: {
        Row: CallStat;
        Insert: Omit<CallStat, "id" | "created_at">;
        Update: Partial<Omit<CallStat, "id" | "created_at">>;
      };
    };
  };
}

// ─── Domain Types ──────────────────────────────────────────────────────────

export interface Profile {
  id: string;
  name: string | null;
  company: string | null;
  is_admin: boolean;
  created_at: string;
}

export interface N8nError {
  id: string;
  customer_id: string | null;
  workflow_name: string;
  error_message: string | null;
  workflow_id: string | null;
  execution_id: string | null;
  status: "open" | "resolved";
  created_at: string;
}

export interface CallStat {
  id: string;
  customer_id: string;
  date: string;
  total_calls: number;
  answered_calls: number;
  duration_seconds: number;
  cost_eur: number;
  created_at: string;
}

// ─── Aggregated view types ─────────────────────────────────────────────────

export interface CustomerSummary {
  profile: Profile;
  totalCalls: number;
  answeredCalls: number;
  totalCostEur: number;
  openErrors: number;
}
