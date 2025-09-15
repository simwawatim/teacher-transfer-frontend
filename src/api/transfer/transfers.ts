export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  nrc: string;
  tsNo: string;
  address: string;
  maritalStatus: string;
  medicalCertificate: string;
  academicQualifications: string;
  professionalQualifications: string;
  currentSchoolType: string;
  currentSchoolName: string;
  currentPosition: string;
  subjectSpecialization: string;
  experience: { school: string; years: number }[];
  createdAt: string;
  updatedAt: string;
  currentSchoolId: number | null;
}

export interface TransferResponse {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  teacherId: number;
  fromSchoolId: number | null;
  toSchoolId: number | null;
  teacher: Teacher;
  fromSchool: any;
  toSchool: any;
}

export const getTransfers = async (): Promise<TransferResponse[]> => {
  const res = await fetch("http://localhost:4000/api/transfers");
  if (!res.ok) throw new Error("Failed to fetch transfers");
  const data: TransferResponse[] = await res.json();
  return data.map((t) => ({
    ...t,
    teacher: {
      ...t.teacher,
      experience: typeof t.teacher.experience === "string"
        ? JSON.parse(t.teacher.experience)
        : Array.isArray(t.teacher.experience)
        ? t.teacher.experience
        : [],
    },
  }));
};

export const submitTransfer = async (teacherId: number, toSchoolId: number) => {
  const res = await fetch("http://localhost:4000/api/transfers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ teacherId, toSchoolId }),
  });
  if (!res.ok) throw new Error("Failed to submit transfer");
  return await res.json();
};


export const fetchTransferById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:4000/api/transfers/${id}`);
    if (!res.ok) throw new Error("Failed to fetch transfer data");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching transfer:", err);
    throw err;
  }
};

export const updateTransferStatus = async (
  id: number,
  status: "approved" | "rejected",
  reason?: string
) => {
  try {
    const url = `http://localhost:4000/api/transfers/${id}/status`;

    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, reason }),
    });

    if (!res.ok) {
      let errorMessage = "Failed to update transfer status";
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {}
      throw new Error(errorMessage);
    }

    return await res.json();
  } catch (err: any) {
    throw new Error(err.message || "An unexpected error occurred");
  }
};

