import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Global variable to cache the lazily initialized Supabase client
let supabaseInstance: SupabaseClient | null = null;

/**
 * Checks if Supabase has been provisioned and configured with environment variables.
 * @returns boolean indicating if credentials are provided and non-empty.
 */
export function isSupabaseConfigured(): boolean {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && anonKey && url.trim() !== "" && anonKey.trim() !== "");
}

/**
 * Lazily retrieves the Supabase client.
 * Using a getter function prevents the React application from crashing on startup 
 * if environment variables are not yet configured.
 * 
 * @returns SupabaseClient
 */
export function getSupabase(): SupabaseClient {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Supabase keys are missing. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
    );
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(url, anonKey);
  }

  return supabaseInstance;
}
