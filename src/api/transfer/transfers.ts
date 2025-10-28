import { apiClient } from "../../api/client/apiClient";
export interface School {
  id: number;
  name: string;
  province: string;
  district: string;
}

export type TransferStatus =
  | "pending"
  | "headteacher_approved"
  | "headteacher_rejected"
  | "approved"
  | "rejected";
export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  nrc: string;
  tsNo: string;
  address: string;
  maritalStatus: string;
  medicalCertificate: string;
  academicQualifications: string;
  professionalQualifications: string;
  currentSchoolType: string;
  currentSchoolName: string;
  currentSchool: School | null;
  currentPosition: string;
  subjectSpecialization: string;
  experience: { school: string; years: number }[];
  createdAt: string;
  updatedAt: string;
  currentSchoolId: number | null;
}

export interface TransferResponse {
  id: number;
  status: TransferStatus;
  createdAt: string;
  updatedAt: string;
  teacherId: number;
  fromSchoolId: number | null;
  toSchoolId: number | null;
  teacher: Teacher;
  fromSchool: School | null;
  toSchool: School | null;
}

export const getTransfers = ( token: string | null ): Promise<TransferResponse[]> =>
  apiClient<TransferResponse[]>( "https://teacher-transfer-backend.vercel.app/api/transfers",{}, token).then((data) =>
    data.map((t) => ({
      ...t,
      teacher: {
        ...t.teacher,
        experience:
          typeof t.teacher.experience === "string"
            ? JSON.parse(t.teacher.experience)
            : Array.isArray(t.teacher.experience)
            ? t.teacher.experience
            : [],
      },
    }))
  );


export const submitTransfer = (teacherId: number, toSchoolId: number, token: string | null ) =>
  apiClient( "https://teacher-transfer-backend.vercel.app/api/transfers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teacherId, toSchoolId }),
    },
    token
  );


export const fetchTransferById = ( id: string, token: string | null ): Promise<TransferResponse> =>
  apiClient<TransferResponse>( `https://teacher-transfer-backend.vercel.app/api/transfers/${id}`, {}, token
  );

export const updateTransferStatus = (id: number, status: TransferStatus, reason: string = "", token: string | null = null) =>
  apiClient(`https://teacher-transfer-backend.vercel.app/api/transfers/${id}/status`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, reason }),
    },
    token
  );
