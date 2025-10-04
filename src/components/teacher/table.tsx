// TeachersTable.tsx
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getTeachers, Teacher } from "../../api/teachers/teachers";
import { getSchools } from "../../api/school/schools";
import router from "next/router";
import { getCurrentUser } from "@/api/base/jwt";

const formatNRCInput = (value: string) => {
  const digits = value.replace(/\D/g, "");
  let part1 = digits.slice(0, 6);
  let part2 = digits.slice(6, 8);
  let part3 = digits.slice(8, 9);

  let formatted = part1;
  if (part2) formatted += "/" + part2;
  if (part3) formatted += "/" + part3;

  return formatted;
};

const TeachersTable = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setRole(currentUser?.role ?? null);
  }, []);

  const [newTeacher, setNewTeacher] = useState<any>({
    role: "teacher",
    teacherData: {
      firstName: "",
      lastName: "",
      email: "",
      nrc: "",
      tsNo: "",
      address: "",
      maritalStatus: "",
      currentSchoolType: "",
      currentSchoolId: "",
      currentPosition: "",
      subjectSpecialization: "",
    },
    medicalCertificate: null as File | null,
    academicQualifications: null as File | null,
    professionalQualifications: null as File | null,
  });

  const itemsPerPage = 10;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");

    const fetchTeachers = async () => {
      try {
        const data = await getTeachers(token!);
        setTeachers(data);
      } catch (err: any) {
        console.error("Error fetching teachers:", err);
        Swal.fire("Error", "Failed to fetch teachers.", "error");
      }
    };

    const fetchSchools = async () => {
      try {
        const data = await getSchools(token!);
        setSchools(data);
      } catch (err: any) {
        console.error("Error fetching schools:", err);
        Swal.fire("Error", "Failed to fetch schools.", "error");
      }
    };

    fetchTeachers();
    fetchSchools();
  }, []);

  // ===== Handle file change =====
  const handleFileChange = (field: string, file: File | null) => {
    setNewTeacher({ ...newTeacher, [field]: file });
  };

  // ===== Handle add teacher =====
const handleAddTeacher = async () => {
  setLoading(true);
  try {
    const formData = new FormData();

    const roleMap: Record<string, string> = {
      Teacher: "teacher",
      "Head Teacher": "headteacher",
    };

    if (newTeacher.teacherData.currentPosition) {
      const mappedRole = roleMap[newTeacher.teacherData.currentPosition] || "teacher";
      formData.append("role", mappedRole);
    }

    if (newTeacher.medicalCertificate) {
      formData.append("medicalCertificate", newTeacher.medicalCertificate);
    }
    if (newTeacher.academicQualifications) {
      formData.append("academicQualifications", newTeacher.academicQualifications);
    }
    if (newTeacher.professionalQualifications) {
      formData.append("professionalQualifications", newTeacher.professionalQualifications);
    }

    // Attach teacherData fields (all strings)
    Object.entries(newTeacher.teacherData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(`teacherData[${key}]`, String(value));
      }
    });

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // NO Content-Type here
      },
      body: formData
    });

    const saved = await response.json();
    if (!response.ok) throw new Error(saved.message || "Failed to save teacher");

    Swal.fire("Success", "Teacher added successfully", "success");
    setIsModalOpen(false);
    setLoading(false);

  } catch (err: any) {
    console.error(err);
    Swal.fire("Error", err.message || "Failed to add teacher", "error");
    setLoading(false);
  }
};



  // ===== Pagination & Filtering (unchanged) =====
const filteredTeachers = teachers.filter((teacher: any) => {
  const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
  const nrc = (teacher.nrc || "").toLowerCase();
  const tsNo = (teacher.tsNo || "").toLowerCase();
  const school = (teacher.currentSchool?.name || "").toLowerCase();
  const position = (teacher.currentPosition || "").toLowerCase();
  const subject = (teacher.subjectSpecialization || "").toLowerCase();

  const term = searchTerm.toLowerCase();
  return (
    fullName.includes(term) ||
    nrc.includes(term) ||
    tsNo.includes(term) ||
    school.includes(term) ||
    position.includes(term) ||
    subject.includes(term)
  );
});

// ===== Search Options for datalist =====
const searchOptions = [
  ...teachers.map((t) => `${t.firstName} ${t.lastName}`),
  ...teachers.map((t) => t.nrc),
  ...teachers.map((t) => t.tsNo),
  ...teachers.map((t) => t.currentSchool?.name ?? ""),
  ...teachers.map((t) => t.currentPosition ?? ""),
  ...teachers.map((t) => t.subjectSpecialization ?? "")
].filter(Boolean);


  // Calculate total pages and current teachers for pagination
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const currentTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
         {(role === "admin") && (
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          + Add Teacher
        </button>
           )}
        <input
          type="text"
          placeholder="Search teachers..."
          list="teacherSearch"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {["No","Name", "NRC No.", "TS No.", "Current School", "Position", "Subject", "Action"].map((header) => (
                <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {currentTeachers.map((teacher: any, index: number) => (


              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {teacher.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {teacher.firstName} {teacher.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{teacher.nrc}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{teacher.tsNo}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.currentSchool?.name || "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{teacher.currentPosition}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{teacher.subjectSpecialization}</td>
                <td className="px-6 py-4 text-sm text-indigo-600 hover:text-indigo-900">
                  <Link href={`/teachers/${teacher.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
            Prev
          </button>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-4xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-6 text-white">Add New Teacher</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["firstName","lastName","email","nrc","tsNo","address"].map((f) => (
                <div key={f} className="flex flex-col">
                  <label className="mb-1 text-gray-300">{f.charAt(0).toUpperCase() + f.slice(1)}</label>
                  <input
                    type="text"
                    value={newTeacher.teacherData[f]}
                    onChange={(e) => {
                      const value = f === "nrc" ? formatNRCInput(e.target.value) : e.target.value;
                      setNewTeacher({ ...newTeacher, teacherData: { ...newTeacher.teacherData, [f]: value } });
                    }}
                    maxLength={f === "nrc" ? 11 : undefined}
                    placeholder={f === "nrc" ? "123456/12/1" : ""}
                    className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}

              {/* Dropdowns */}
              {[
                { field: "maritalStatus", options: ["Single", "Married", "Divorced", "Widowed"] },
                { field: "professionalQualifications", options: ["Primary Diploma", "Secondary Diploma", "Primary Degree", "Secondary Degree"] },
                { field: "currentSchoolType", options: ["Community", "Primary", "Secondary"] },
                { field: "currentPosition", options: ["Teacher", "Head Teacher"] },
              ].map(({ field, options }) => (
                <div key={field} className="flex flex-col">
                  <label className="mb-1 text-gray-300">{field.replace(/([A-Z])/g, " $1")}</label>
                  <select
                    value={newTeacher.teacherData[field] || ""}
                    onChange={(e) => setNewTeacher({ ...newTeacher, teacherData: { ...newTeacher.teacherData, [field]: e.target.value } })}
                    className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select {field.replace(/([A-Z])/g, " $1")}</option>
                    {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}

              {/* Current School */}
              <div className="flex flex-col">
                <label className="mb-1 text-gray-300">Current School</label>
                <select
                  value={newTeacher.teacherData.currentSchoolId || ""}
                  onChange={(e) => setNewTeacher({ ...newTeacher, teacherData: { ...newTeacher.teacherData, currentSchoolId: e.target.value } })}
                  className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select School</option>
                  {schools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)}
                </select>
              </div>

              {/* Subject */}
              <div className="flex flex-col">
                <label className="mb-1 text-gray-300">Subject Specialization</label>
                <select
                  value={newTeacher.teacherData.subjectSpecialization || ""}
                  onChange={(e) => setNewTeacher({ ...newTeacher, teacherData: { ...newTeacher.teacherData, subjectSpecialization: e.target.value } })}
                  className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Subject</option>
                  {["Mathematics","English","Science","History","Geography","Physical Education","Biology","Chemistry","Physics","Computer Studies"].map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              {/* File Inputs */}
              {[
                { field: "medicalCertificate", label: "Medical Certificate" },
                { field: "academicQualifications", label: "Academic Qualifications" },
                { field: "professionalQualifications", label: "Professional Qualifications" },
              ].map(({ field, label }) => (
                <div key={field} className="flex flex-col">
                  <label className="mb-1 text-gray-300">{label}</label>
                  <input type="file" onChange={(e) => handleFileChange(field, e.target.files?.[0] ?? null)}
                    className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors" disabled={loading}>
                Cancel
              </button>
              <button onClick={handleAddTeacher} disabled={loading} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition-colors">
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersTable;
