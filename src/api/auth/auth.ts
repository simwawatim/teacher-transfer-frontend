import { API_BASE_URL } from "../base/base";

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData || { message: "Login failed" };
    }

    return await response.json();
  } catch (error: any) {
    throw error?.message ? error : { message: "Login failed" };
  }
};
