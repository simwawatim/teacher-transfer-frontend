import { API_BASE_URL } from "../base/base";
import { ReactNode } from "react";



export interface Teacher {
  professionalQualifications: ReactNode;
  medicalCertificate: ReactNode;
  maritalStatus: ReactNode;
  address: ReactNode;
  phone: ReactNode;
  email: ReactNode;
  bio: ReactNode;
  academicQualifications: ReactNode;
  lastName: any;
  firstName: any;
  subjectSpecialization: any;
  currentSchoolName: any;
  currentPosition: any;
  id?: number;
  name: string;
  nrc: string;
  tsNo: string;
  school: string;
  position: string;
  subject: string;
  experience: string;
}

export const getTeachers = async (): Promise<Teacher[]> => {
  const res = await fetch(`${API_BASE_URL}/teachers`);
  if (!res.ok) throw new Error("Failed to fetch teachers");
  return res.json();
};

export const addTeacher = async (teacher: Teacher): Promise<Teacher> => {
  const res = await fetch(`http://localhost:4000/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(teacher),
  });
  if (!res.ok) throw new Error("Failed to add teacher");
  return res.json();
};


export const getTeacherById = async (id: string): Promise<Teacher> => {
  try {
    const res = await fetch(`${API_BASE_URL}/teachers/${id}`);
    if (!res.ok) {
      throw new Error(`Error fetching teacher with ID ${id}: ${res.statusText}`);
    }
    const data: Teacher = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching teacher by ID:", err);
    throw err;
  }
};
