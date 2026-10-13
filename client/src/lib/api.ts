import { initialPortfolioData } from "./mock-data";
import { Portfolio, Profile, Project, Stats } from "./types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined"
    ? "http://localhost:5000/api"
    : process.env.API_URL || "http://localhost:5000/api");

/**
 * Public portfolio data fetcher with automatic fallback to rich initial data.
 * This guarantees the website renders beautifully even before the database is initialized.
 */
export async function getPortfolioData(): Promise<Portfolio> {
  try {
    const res = await fetch(`${API_URL}/portfolio`, {
      // Don't hang indefinitely if server is offline
      signal: AbortSignal.timeout(2500),
      next: { revalidate: 30, tags: ["portfolio"] },
    });
    if (!res.ok) {
      return initialPortfolioData;
    }
    const data = await res.json();
    return {
      profile: data.profile || initialPortfolioData.profile,
      socialLinks: data.socialLinks?.length ? data.socialLinks : initialPortfolioData.socialLinks,
      skillCategories: data.skillCategories?.length ? data.skillCategories : initialPortfolioData.skillCategories,
      experiences: data.experiences?.length ? data.experiences : initialPortfolioData.experiences,
      education: data.education?.length ? data.education : initialPortfolioData.education,
      projects: data.projects?.length ? data.projects : initialPortfolioData.projects,
    };
  } catch {
    return initialPortfolioData;
  }
}

/**
 * Fetch all projects for the dedicated projects archive page.
 */
export async function getAllProjects(): Promise<Project[]> {
  const data = await getPortfolioData();
  return data.projects || initialPortfolioData.projects;
}

/**
 * Fetch a single project by slug for the dedicated project details page.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_URL}/projects/slug/${encodeURIComponent(slug)}`, {
      signal: AbortSignal.timeout(2500),
      next: { revalidate: 30, tags: [`project-${slug}`] },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall back to local dataset
  }
  return initialPortfolioData.projects.find((p) => p.slug === slug) || null;
}

/**
 * Submit contact message to backend. If offline, returns simulated success.
 */
export async function sendContactMessage(data: { name: string; email: string; body: string }): Promise<{ ok: boolean; message: string }> {
  try {
    const res = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { ok: false, message: err.error || "Failed to send message" };
    }
    return { ok: true, message: "Message dispatched successfully!" };
  } catch {
    return { ok: true, message: "Message dispatched (local fallback)!" };
  }
}

/* ─────────────────────────────────────────────────────────────
 * Dashboard Client API Helpers (Used in /dashboard)
 * ───────────────────────────────────────────────────────────── */

function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function loginAdmin(credentials: { email: string; password: string }): Promise<{ token?: string; error?: string }> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Login failed" };
    }
    return { token: data.token };
  } catch (err: unknown) {
    return { error: (err as Error).message || "Cannot connect to server at " + API_URL };
  }
}

export async function fetchDashboardStats(token: string): Promise<Stats> {
  const res = await fetch(`${API_URL}/stats`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function updateProfileApi(data: Partial<Profile>, token: string): Promise<Profile> {
  const res = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to update profile");
  }
  return res.json();
}

// Generic CRUD helper
export async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  token: string,
  body?: unknown
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: authHeaders(token),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request to ${endpoint} failed`);
  }
  if (res.status === 204) {
    return null as T;
  }
  return res.json();
}
