/*
  # Authentication and User Management Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users, primary key)
      - `first_name` (text, required)
      - `last_name` (text, required) 
      - `dob` (date, required)
      - `mobile` (text, required)
      - `email` (text, required)
      - `category` (user_category enum, required)
      - `role` (user_role enum, defaults to UserAdmin)
      - `address` (text, optional)
      - `city` (text, optional)
      - `post` (text, optional)
      - `country` (text, optional)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `profiles` table
    - Add policy for users to read/update own profile
    - Add policy for SuperAdmin to view/update all profiles

  3. Enums
    - `user_category`: Staff, Vendor, PublicUser
    - `user_role`: SuperAdmin, SupportAdmin, AccountsAdmin, MarketingAdmin, PartnerAdmin, SupplierAdmin, AgentAdmin, UserAdmin
*/

-- Create enums for user categories and roles
CREATE TYPE user_category AS ENUM ('Staff', 'Vendor', 'PublicUser');

CREATE TYPE user_role AS ENUM (
  'SuperAdmin',
  'SupportAdmin', 'AccountsAdmin', 'MarketingAdmin',
  'PartnerAdmin', 'SupplierAdmin', 'AgentAdmin',
  'UserAdmin'
);

-- Create profiles table linked to Supabase Auth users
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  dob date NOT NULL,
  mobile text NOT NULL,
  email text NOT NULL,
  category user_category NOT NULL,
  role user_role NOT NULL DEFAULT 'UserAdmin',
  address text,
  city text,
  post text,
  country text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies for profile access
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "SuperAdmin can view all profiles"
  ON profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() AND p.role = 'SuperAdmin'
  ));

CREATE POLICY "SuperAdmin can update all profiles"
  ON profiles FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() AND p.role = 'SuperAdmin'
  ));

CREATE POLICY "SuperAdmin can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = auth.uid() AND p.role = 'SuperAdmin'
  ));

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();