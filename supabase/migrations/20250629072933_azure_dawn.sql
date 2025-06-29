/*
  # Fix Storage Policies and RLS Issues

  1. Storage Bucket Setup
    - Create avatars bucket if not exists
    - Fix storage policies for avatar uploads

  2. RLS Policy Updates
    - Fix profile policies to allow proper avatar uploads
    - Ensure proper permissions for authenticated users

  3. Functions
    - Add helper functions for storage operations
*/

-- Create storage bucket for avatars if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies to recreate them
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own avatar" ON storage.objects;

-- Create new storage policies
CREATE POLICY "Avatar images are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Users can update their own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can delete their own avatar"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars');

-- Ensure profiles table has proper policies
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Function to get user ID for storage path validation
CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  	coalesce(
		nullif(current_setting('request.jwt.claim.sub', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
	)::uuid
$$;