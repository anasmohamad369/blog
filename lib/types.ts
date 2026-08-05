export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  bannerImage: string;
  category: string;
  tags: string[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  bannerImage?: string;
  category: string;
  tags: string[] | string;
  seoTitle?: string;
  seoDescription?: string;
  published?: boolean;
}

export interface UpdateBlogInput extends Partial<CreateBlogInput> {
  id: string;
}

export interface BlogFilterOptions {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedBlogsResponse {
  blogs: Blog[];
  total: number;
  page: number;
  totalPages: number;
  categories: string[];
}
