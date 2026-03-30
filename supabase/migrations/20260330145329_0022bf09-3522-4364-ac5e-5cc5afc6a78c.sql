
-- 1. profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT,
  company     TEXT,
  is_admin    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. n8n_errors table
CREATE TABLE IF NOT EXISTS public.n8n_errors (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  workflow_name  TEXT NOT NULL,
  error_message  TEXT,
  workflow_id    TEXT,
  execution_id   TEXT,
  status         TEXT NOT NULL DEFAULT 'open',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. call_stats table
CREATE TABLE IF NOT EXISTS public.call_stats (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date              DATE NOT NULL,
  total_calls       INTEGER NOT NULL DEFAULT 0,
  answered_calls    INTEGER NOT NULL DEFAULT 0,
  duration_seconds  INTEGER NOT NULL DEFAULT 0,
  cost_eur          DECIMAL(10, 4) NOT NULL DEFAULT 0,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (customer_id, date)
);

-- 4. Enable RLS
ALTER TABLE public.profiles   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.n8n_errors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_stats ENABLE ROW LEVEL SECURITY;

-- Helper: is current user admin?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true
  );
$$;

-- profiles policies
CREATE POLICY "profiles: user read own"
  ON public.profiles FOR SELECT USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "profiles: user update own"
  ON public.profiles FOR UPDATE USING (id = auth.uid());

-- n8n_errors policies
CREATE POLICY "n8n_errors: user read"
  ON public.n8n_errors FOR SELECT
  USING (customer_id = auth.uid() OR public.is_admin());

CREATE POLICY "n8n_errors: user update own"
  ON public.n8n_errors FOR UPDATE
  USING (customer_id = auth.uid() OR public.is_admin());

CREATE POLICY "n8n_errors: service insert"
  ON public.n8n_errors FOR INSERT
  WITH CHECK (true);

-- call_stats policies
CREATE POLICY "call_stats: user read"
  ON public.call_stats FOR SELECT
  USING (customer_id = auth.uid() OR public.is_admin());

CREATE POLICY "call_stats: service insert"
  ON public.call_stats FOR INSERT
  WITH CHECK (true);

CREATE POLICY "call_stats: service update"
  ON public.call_stats FOR UPDATE
  USING (true);
