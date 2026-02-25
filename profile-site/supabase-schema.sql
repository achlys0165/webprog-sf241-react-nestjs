-- ============================================================
-- Supabase Setup — matches your existing "guestbook" table
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Your table already exists with: id (uuid), name, message, created_at
-- Just run this to enable RLS policies so the API can read/write:

ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read"
  ON guestbook FOR SELECT USING (true);

CREATE POLICY "Allow public insert"
  ON guestbook FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update"
  ON guestbook FOR UPDATE USING (true);

CREATE POLICY "Allow public delete"
  ON guestbook FOR DELETE USING (true);

-- ============================================================
-- OPTIONAL: Add a profile table for dynamic Home page data
-- ============================================================

-- CREATE TABLE IF NOT EXISTS profile (
--   id SERIAL PRIMARY KEY,
--   name TEXT NOT NULL DEFAULT 'Your Name',
--   title TEXT DEFAULT 'Full-Stack Developer',
--   bio TEXT DEFAULT 'Welcome to my profile!',
--   location TEXT,
--   avatar_url TEXT,
--   github_url TEXT,
--   linkedin_url TEXT,
--   skills TEXT[] DEFAULT ARRAY[]::TEXT[]
-- );
--
-- INSERT INTO profile (id, name, title, bio, location, skills)
-- VALUES (1, 'Your Name', 'Full-Stack Developer', 'I build things for the web.',
--         'Manila, PH', ARRAY['TypeScript','React','NestJS'])
-- ON CONFLICT (id) DO NOTHING;
--
-- ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all on profile" ON profile FOR ALL USING (true);
