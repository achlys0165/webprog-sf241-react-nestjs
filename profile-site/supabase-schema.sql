-- ============================
-- Supabase Database Setup
-- Run these in your Supabase SQL Editor
-- ============================

-- 1. PROFILE TABLE
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Your Name',
  title TEXT DEFAULT 'Full-Stack Developer',
  bio TEXT DEFAULT 'Welcome to my profile!',
  location TEXT,
  avatar_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert the default profile row
INSERT INTO profile (id, name, title, bio, location, skills)
VALUES (
  1,
  'Your Name',
  'Full-Stack Developer',
  'I build things for the web. Passionate about clean code, great UX, and making ideas come to life.',
  'Manila, Philippines',
  ARRAY['TypeScript', 'React', 'NestJS', 'PostgreSQL', 'Docker']
)
ON CONFLICT (id) DO NOTHING;

-- 2. GUESTBOOK ENTRIES TABLE
CREATE TABLE IF NOT EXISTS guestbook_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ROW LEVEL SECURITY (RLS)
-- Enable RLS
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;

-- Profile: allow read by anyone, write via service role only
CREATE POLICY "Allow public read on profile"
  ON profile FOR SELECT USING (true);

CREATE POLICY "Allow all on profile for anon"
  ON profile FOR ALL USING (true);

-- Guestbook: allow all operations via anon key
CREATE POLICY "Allow public read on guestbook"
  ON guestbook_entries FOR SELECT USING (true);

CREATE POLICY "Allow public insert on guestbook"
  ON guestbook_entries FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on guestbook"
  ON guestbook_entries FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on guestbook"
  ON guestbook_entries FOR DELETE USING (true);
