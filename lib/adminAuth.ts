import { prisma } from "./prisma";
import crypto from "crypto";

const CONFIG_ID = "admin-config";

export function hashString(str: string): string {
  return crypto.createHash("sha256").update(str + "earthing_secret_salt_2026").digest("hex");
}

export async function getAdminPasswordHash(): Promise<string | null> {
  if (process.env.ADMIN_PASSWORD) {
    return hashString(process.env.ADMIN_PASSWORD);
  }

  try {
    const data = await prisma.blog.findUnique({
      where: { id: CONFIG_ID },
    });

    if (data && data.excerpt) {
      return data.excerpt;
    }
  } catch (err) {
    console.error("getAdminPasswordHash error:", err);
  }
  return null;
}

export async function verifyAdminPassword(inputPassword: string): Promise<boolean> {
  let currentHash = await getAdminPasswordHash();

  // If DB has no admin password configured yet, set the submitted password as initial admin password
  if (!currentHash) {
    const success = await setAdminPassword(inputPassword);
    if (success) {
      return true;
    }
    return false;
  }

  const inputHash = hashString(inputPassword);
  return currentHash === inputHash;
}

export async function setAdminPassword(newPassword: string): Promise<boolean> {
  const newHash = hashString(newPassword);

  const data = {
    title: "Admin Portal Config",
    slug: "admin-portal-config",
    excerpt: newHash,
    content: "Admin Authentication System Configuration",
    coverImage: "",
    bannerImage: "",
    category: "SystemConfig",
    tags: "auth",
    published: false,
  };

  try {
    await prisma.blog.upsert({
      where: { id: CONFIG_ID },
      update: { excerpt: newHash },
      create: { id: CONFIG_ID, ...data },
    });
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
  return token.length === 64;
}
