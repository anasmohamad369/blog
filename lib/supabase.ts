import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://yjgfbueleujzokfmdnfa.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY || "";

// Public client for reads (uses anon/publishable key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for storage operations (uses service role key)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
