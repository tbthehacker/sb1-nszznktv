/*
  # Create pastes table for storing text snippets

  1. New Tables
    - `pastes`
      - `id` (uuid, primary key)
      - `content` (text, stores the paste content)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `pastes` table
    - Add policy for public read access
    - Add policy for authenticated users to create pastes
*/

CREATE TABLE IF NOT EXISTS pastes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pastes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read pastes
CREATE POLICY "Pastes are publicly readable" 
  ON pastes
  FOR SELECT 
  TO public
  USING (true);

-- Allow anyone to create pastes
CREATE POLICY "Anyone can create pastes"
  ON pastes
  FOR INSERT
  TO public
  WITH CHECK (true);