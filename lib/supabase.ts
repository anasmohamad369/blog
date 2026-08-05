import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://yjgfbueleujzokfmdnfa.supabase.co";
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_QNIyBaXyGLRxWPbjHtuPVw_Hkoi7JKy";

export const supabase = createClient(supabaseUrl, supabaseKey);
