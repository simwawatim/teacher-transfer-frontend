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

  // Handle Unauthorized
  if (res.status === 401) {
    Router.push("/");
    throw new Error("Unauthorized access");
  }

  // Handle Payload Too Large
  if (res.status === 413) {
    return Promise.reject({
      status: 413,
      message: "Payload too large. Please reduce file size or data.",
    });
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Request failed");
  }

  return res.json() as Promise<T>;
};
