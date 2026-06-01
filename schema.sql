-- ----------------------------------------------------
-- SUPABASE SCHEMA SEED FOR STUDENT LEARNING DASHBOARD
-- Table: courses
-- Description: Stores course details, user progress, and icons.
-- ----------------------------------------------------

-- Drop table if exists (for clean development resets)
DROP TABLE IF EXISTS public.courses;

-- Create courses table
CREATE TABLE public.courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) to enforce safe API access
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone (anon, authenticated) to read course details
CREATE POLICY "Allow public read access to courses" 
  ON public.courses 
  FOR SELECT 
  TO public 
  USING (true);

-- Seed realistic sample data
INSERT INTO public.courses (title, progress, icon_name, created_at) VALUES
  ('Advanced React Patterns', 68, 'Code2', NOW() - INTERVAL '4 days'),
  ('Next.js App Router Mastery', 85, 'Layers', NOW() - INTERVAL '3 days'),
  ('TypeScript for Scale', 40, 'Shield', NOW() - INTERVAL '2 days'),
  ('Framer Motion Fundamentals', 95, 'Zap', NOW() - INTERVAL '1 day');
