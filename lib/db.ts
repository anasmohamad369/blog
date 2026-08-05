import { Pool } from "pg";

let pool: Pool | null = null;

function getConnectionString(): string | null {
  const dbUrl = process.env.DATABASE_URL || "";
  if (dbUrl.startsWith("postgres://") || dbUrl.startsWith("postgresql://")) {
    return dbUrl;
  }
  const supaUrl = process.env.SUPABASE_URL || "";
  if (supaUrl.includes("supabase.co")) {
    const projectRef = supaUrl.replace("https://", "").replace(".supabase.co", "");
    return `postgresql://postgres:${process.env.SUPABASE_SECRET_KEY || "postgres"}@db.${projectRef}.supabase.co:5432/postgres`;
  }
  return null;
}

export function getPgPool(): Pool | null {
  if (pool) return pool;
  const connStr = getConnectionString();
  if (!connStr) return null;

  try {
    pool = new Pool({
      connectionString: connStr,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 3000,
    });
    return pool;
  } catch (err) {
    console.warn("Could not create Postgres connection pool:", err);
    return null;
  }
}

let tableInitialized = false;

export async function ensureBlogsTableExists() {
  if (tableInitialized) return;

  try {
    const p = getPgPool();
    if (!p) return;

    await p.query(`
      CREATE TABLE IF NOT EXISTS public.blogs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image TEXT NOT NULL,
        banner_image TEXT DEFAULT '',
        category TEXT NOT NULL,
        tags TEXT[] DEFAULT '{}',
        seo_title TEXT,
        seo_description TEXT,
        published BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    tableInitialized = true;
    console.log("Automatic Table Check: 'public.blogs' table is ready in Supabase.");
  } catch (err) {
    console.warn("Auto table creation fallback:", err);
  }
}
