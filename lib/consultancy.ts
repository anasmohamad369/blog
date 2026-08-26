import { prisma } from "./prisma";

export type EnquiryStatus = "new" | "contacted" | "resolved";

export interface ConsultancyRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export async function createConsultancyRequest(input: {
  name: string;
  email: string;
  phone?: string;
  category?: string;
  message: string;
}): Promise<ConsultancyRequest> {
  const reqItem = {
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || "",
    category: input.category || "General Inquiry",
    message: input.message.trim(),
  };

  const created = await prisma.blog.create({
    data: {
      id: "consultancy-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      title: reqItem.name,
      slug: "consultancy-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
      excerpt: `${reqItem.email} • ${reqItem.phone}`,
      content: reqItem.message,
      coverImage: "",
      bannerImage: "",
      category: "ConsultancyRequest",
      tags: reqItem.category,
      seoTitle: "new",
      published: false,
    },
  });

  return {
    id: created.id,
    name: created.title,
    email: reqItem.email,
    phone: reqItem.phone,
    category: reqItem.category,
    message: reqItem.message,
    status: "new",
    createdAt: created.createdAt ? created.createdAt.toISOString() : new Date().toISOString(),
  };
}

export async function getConsultancyRequests(): Promise<ConsultancyRequest[]> {
  try {
    const data = await prisma.blog.findMany({
      where: { category: "ConsultancyRequest" },
      orderBy: { createdAt: "desc" },
    });

    return data.map((d) => {
      const parts = (d.excerpt || "").split(" • ");
      return {
        id: d.id,
        name: d.title,
        email: parts[0] || "",
        phone: parts[1] || "",
        category: d.tags || "General Inquiry",
        message: d.content,
        status: (d.seoTitle as EnquiryStatus) || "new",
        createdAt: d.createdAt ? d.createdAt.toISOString() : new Date().toISOString(),
      };
    });
  } catch (err) {
    console.error("getConsultancyRequests warning:", err);
    return [];
  }
}

export async function updateConsultancyStatus(id: string, status: EnquiryStatus): Promise<boolean> {
  try {
    await prisma.blog.update({
      where: { id },
      data: { seoTitle: status },
    });
    return true;
  } catch (err) {
    console.error("updateConsultancyStatus error:", err);
    return false;
  }
}

export async function deleteConsultancyRequest(id: string): Promise<boolean> {
  try {
    await prisma.blog.delete({
      where: { id },
    });
    return true;
  } catch (err) {
    console.error("deleteConsultancyRequest error:", err);
    return false;
  }
}
