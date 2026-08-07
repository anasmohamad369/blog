import { supabase } from "./supabase";
import crypto from "crypto";

const DEFAULT_ADMIN_PASSWORD = "1234";
const CONFIG_ID = "admin-config";

// Simple hash function for session tokens & password storage
export function hashString(str: string): string {
  return crypto.createHash("sha256").update(str + "earthing_secret_salt_2026").digest("hex");
}

export async function getAdminPasswordHash(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from("Blog")
      .select("*")
      .eq("id", CONFIG_ID)
      .maybeSingle();

    if (!error && data && data.excerpt) {
      return data.excerpt; // stored hashed password
    }
  } catch (err) {
    console.warn("getAdminPasswordHash warning:", err);
  }
  // Default to hashed "1234"
  return hashString(DEFAULT_ADMIN_PASSWORD);
}

export async function verifyAdminPassword(inputPassword: string): Promise<boolean> {
  const currentHash = await getAdminPasswordHash();
  const inputHash = hashString(inputPassword);
  return currentHash === inputHash;
}

export async function setAdminPassword(newPassword: string): Promise<boolean> {
  const newHash = hashString(newPassword);
  const now = new Date().toISOString();

  const row = {
    id: CONFIG_ID,
    title: "Admin Portal Config",
    slug: "admin-portal-config",
    excerpt: newHash, // Store password hash in excerpt
    content: "Admin Authentication System Configuration",
    coverImage: "",
    bannerImage: "",
    category: "SystemConfig",
    tags: "auth",
    published: false,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const { error } = await supabase.from("Blog").upsert([row]);
    if (error) {
      console.error("setAdminPassword error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("setAdminPassword exception:", err);
    return false;
  }
}

export function generateSessionToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || "earthing_solutions_admin_auth_token";
  return hashString(secret + Date.now().toString());
}

export async function isValidSession(token: string): Promise<boolean> {
  if (!token) return false;
  // Check if token matches expected hashed format length
  return token.length === 64;
}
