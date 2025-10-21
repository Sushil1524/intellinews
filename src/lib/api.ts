// API configuration and utilities
export const API_BASE_URL = "http://127.0.0.1:8000";

// Auth types
export type UserCreate = {
  email: string;
  username: string;
  password: string;
  full_name?: string;
  dob?: string;
  vocab_proficiency?: "beginner" | "intermediate" | "advanced";
  daily_practice_target?: number;
  news_preferences?: Record<string, boolean>;
};

export type UserLogin = {
  email: string;
  username: string;
  password: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

// Article types
export type Article = {
  _id: string;
  title: string;
  url: string;
  content: string;
  summary?: string;
  category?: string;
  tags: string[];
  sentiment?: string;
  author_email: string;
  upvotes: number;
  downvotes: number;
  comments_count: number;
  views: number;
  created_at: string;
  updated_at: string;
};

// Comment types
export type Comment = {
  _id: string;
  article_id: string;
  content: string;
  author_email: string;
  parent_id?: string;
  upvotes: number;
  downvotes: number;
  created_at: string;
  updated_at: string;
};

export type CommentCreate = {
  article_id: string;
  content: string;
  parent_id?: string;
};

// API helper with auth
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("access_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/auth?tab=login";
    throw new Error("Unauthorized");
  }

  return response;
}

// Auth API
export const authAPI = {
  async register(data: UserCreate): Promise<TokenResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  },

  async login(data: UserLogin): Promise<TokenResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  },
};

// Articles API
export const articlesAPI = {
  async getArticles(params?: {
    cursor?: string;
    limit?: number;
    category?: string;
    tag?: string;
  }): Promise<{ articles: Article[]; next_cursor?: string }> {
    const searchParams = new URLSearchParams();
    if (params?.cursor) searchParams.set("cursor", params.cursor);
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.category) searchParams.set("category", params.category);
    if (params?.tag) searchParams.set("tag", params.tag);

    const response = await fetchWithAuth(`/article/?${searchParams}`);
    if (!response.ok) throw new Error("Failed to fetch articles");
    return response.json();
  },

  async getArticle(id: string): Promise<Article> {
    const response = await fetchWithAuth(`/article/${id}`);
    if (!response.ok) throw new Error("Failed to fetch article");
    return response.json();
  },

  async upvote(id: string): Promise<void> {
    const response = await fetchWithAuth(`/article/${id}/upvote`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to upvote");
  },

  async downvote(id: string): Promise<void> {
    const response = await fetchWithAuth(`/article/${id}/downvote`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to downvote");
  },
};

// Comments API
export const commentsAPI = {
  async getComments(articleId: string): Promise<Comment[]> {
    const response = await fetchWithAuth(`/comments/${articleId}`);
    if (!response.ok) throw new Error("Failed to fetch comments");
    return response.json();
  },

  async createComment(data: CommentCreate): Promise<Comment> {
    const response = await fetchWithAuth("/comments/", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create comment");
    return response.json();
  },

  async deleteComment(id: string): Promise<void> {
    const response = await fetchWithAuth(`/comments/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete comment");
  },

  async upvote(id: string): Promise<void> {
    const response = await fetchWithAuth(`/comments/${id}/upvote`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to upvote");
  },

  async downvote(id: string): Promise<void> {
    const response = await fetchWithAuth(`/comments/${id}/downvote`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to downvote");
  },
};

// Bookmarks API
export const bookmarksAPI = {
  async getBookmarks(): Promise<Article[]> {
    const response = await fetchWithAuth("/bookmarks/bookmarks/");
    if (!response.ok) throw new Error("Failed to fetch bookmarks");
    return response.json();
  },

  async addBookmark(articleId: string): Promise<void> {
    const response = await fetchWithAuth(`/bookmarks/bookmarks/${articleId}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to add bookmark");
  },

  async removeBookmark(articleId: string): Promise<void> {
    const response = await fetchWithAuth(`/bookmarks/bookmarks/${articleId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to remove bookmark");
  },
};

// Admin API
export const adminAPI = {
  async refreshFeed(): Promise<void> {
    const response = await fetchWithAuth("/admin/refresh", {
      method: "POST",
    });
    if (!response.ok) throw new Error("Failed to refresh feed");
  },
};
