
import Router from "next/router";

export const apiClient = async <T>(
  url: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> => {
  if (!token) {
    Router.push("/");
    throw new Error("No authentication token found");
  }

  const headers: HeadersInit = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    Router.push("/");
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return res.json() as Promise<T>;
};
