import { supabase } from "./supabase";

export interface ConsultancyRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
  createdAt: string;
}

export async function createConsultancyRequest(input: {
  name: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
}): Promise<ConsultancyRequest> {
  const now = new Date().toISOString();
  const id = "consultancy-" + Date.now();

  const reqItem: ConsultancyRequest = {
    id,
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || "",
    category: input.category || "General Inquiry",
    message: input.message.trim(),
    createdAt: now,
  };

  const row = {
    id: reqItem.id,
    title: reqItem.name,
    slug: reqItem.id,
    excerpt: `${reqItem.email}${reqItem.phone ? " • " + reqItem.phone : ""}`,
    content: reqItem.message,
    coverImage: "",
    bannerImage: "",
    category: "ConsultancyRequest",
    tags: reqItem.category || "General Inquiry",
    published: false,
    createdAt: now,
    updatedAt: now,
  };

  try {
    const { error } = await supabase.from("Blog").insert([row]);
    if (error) {
      console.warn("Supabase ConsultancyRequest insert notice:", error.message);
    }
  } catch (err) {
    console.warn("ConsultancyRequest save exception:", err);
  }

  return reqItem;
}

export async function getConsultancyRequests(): Promise<ConsultancyRequest[]> {
  try {
    const { data, error } = await supabase
      .from("Blog")
      .select("*")
      .eq("category", "ConsultancyRequest")
      .order("createdAt", { ascending: false });

    if (!error && data) {
      return data.map((d: any) => {
        const parts = (d.excerpt || "").split(" • ");
        return {
          id: d.id,
          name: d.title,
          email: parts[0] || "",
          phone: parts[1] || "",
          category: d.tags || "General Inquiry",
          message: d.content,
          createdAt: d.createdAt || new Date().toISOString(),
        };
      });
    }
  } catch (err) {
    console.warn("getConsultancyRequests warning:", err);
  }

  return [];
}
