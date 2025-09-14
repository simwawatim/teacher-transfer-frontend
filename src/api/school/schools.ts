import { API_BASE_URL } from "../base/base";

export interface School {
  id?: number;
  name: string;
  district: string;
  province: string;
  code?: string; 
}

const API_SCHOOLS = `${API_BASE_URL}/schools`;

// GET all schools
export const getSchools = async (): Promise<School[]> => {
  const res = await fetch(API_SCHOOLS);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch schools");
  }
  return res.json();
};

// GET single school by ID
export const getSchool = async (id: number): Promise<School> => {
  const res = await fetch(`${API_SCHOOLS}/${id}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch school");
  }
  return res.json();
};

// CREATE school
export const addSchool = async (school: School): Promise<School> => {
  const res = await fetch(API_SCHOOLS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(school),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to add school");
  }
  return res.json();
};

// UPDATE school by ID
export const updateSchool = async (school: School): Promise<School> => {
  if (!school.id) throw new Error("School ID is required for update");
  const res = await fetch(`${API_SCHOOLS}/${school.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(school),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update school");
  }
  return res.json();
};

// DELETE school by ID
export const deleteSchool = async (id: number): Promise<void> => {
  const res = await fetch(`${API_SCHOOLS}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete school");
  }
};
