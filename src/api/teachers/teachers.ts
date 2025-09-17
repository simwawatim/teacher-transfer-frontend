// src/api/teachers.ts
import { API_BASE_URL, IMAGE_BASE_URL } from "../base/base";
import { apiClient } from "../../api/client/apiClient";

// Teacher interface
export interface Teacher {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone?: string;
  maritalStatus?: string;
  bio?: string;
  professionalQualifications?: string;
  academicQualifications?: string;
  medicalCertificate?: string;
  subjectSpecialization?: string;
  currentSchoolName?: string;
  currentSchoolType?: string;
  currentPosition?: string;
  nrc?: string;
  tsNo?: string;
  experience?: string; 
  profilePicture?: string | null;
  currentSchool?: {
    id: number;
    name: string;
    code: string;
    district: string;
    province: string;
  };
}

// Fetch all teachers
export const getTeachers = (token: string | null): Promise<Teacher[]> => {
  return apiClient<Teacher[]>(`${API_BASE_URL}/teachers`, {}, token);
};

// Add/register teacher
export const addTeacher = async (teacher: Teacher | FormData, token?: string | null): Promise<Teacher> => {
  const isFormData = teacher instanceof FormData;
  return apiClient<Teacher>(
    `${API_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: isFormData ? teacher : JSON.stringify(teacher),
    },
    token
  );
};

// Get a teacher by string ID
export const getTeacherById = (id: string, token: string | null): Promise<Teacher> => {
  return apiClient<Teacher>(`${API_BASE_URL}/teachers/${id}`, {}, token);
};

// Get a teacher by numeric ID
export const getTeacher = (id: number, token: string | null): Promise<Teacher> => {
  return apiClient<Teacher>(`${API_BASE_URL}/teachers/${id}`, {}, token);
};

// Update a teacher (with FormData)
export const updateTeacher = (id: number, data: FormData, token: string | null): Promise<Teacher> => {
  return apiClient<Teacher>(
    `${API_BASE_URL}/teachers/${id}`,
    {
      method: "PUT",
      body: data,
    },
    token
  );
};

// Get full profile picture URL
export const getProfilePictureUrl = (path: string | null | undefined) => {
  if (!path) return "/blank-male.jpg";
  return `${IMAGE_BASE_URL}${path}`;
};
