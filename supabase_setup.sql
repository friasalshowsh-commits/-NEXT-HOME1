-- SQL Schema Setup for NEXT HOME Consultation Database inside Supabase
-- Run this code in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create the consultation_requests table
CREATE TABLE IF NOT EXISTS public.consultation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row-Level Security (RLS)
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;

-- 3. Create a Security Policy to allow public visitors to INSERT requests
-- This allows forms on the frontend website to create records without requiring authentication.
CREATE POLICY "Allow anonymous form submissions" 
ON public.consultation_requests 
FOR INSERT 
WITH CHECK (true);

-- 4. Create a Security Policy to allow administrators or authenticated staff to view the inquiries
-- Modify this if you want restrictive admin roles.
CREATE POLICY "Allow authenticated administrative reads" 
ON public.consultation_requests 
FOR SELECT 
TO authenticated 
USING (true);

COMMENT ON TABLE public.consultation_requests IS 'Executive contact and strategic consultation requests for NEXT HOME';
