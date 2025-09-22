import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getTeachers, addTeacher, Teacher } from "../../api/teachers/teachers";
import { getSchools } from "../../api/school/schools"
import router from "next/router";


const formatNRCInput = (value: string) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "");

  let part1 = digits.slice(0, 6);   // first 6 digits
  let part2 = digits.slice(6, 8);   // next 2 digits
  let part3 = digits.slice(8, 9);   // last digit

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
      medicalCertificate: null,
      academicQualifications: null,
      professionalQualifications: null,
      currentSchoolType: "",
      currentSchoolId: "",
      currentPosition: "",
      subjectSpecialization: "",
    },
  });

  const itemsPerPage = 10;

  useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/");
        return;
      }

      const fetchTeachers = async () => {
        try {
          const data = await getTeachers(token);
          setTeachers(data);
        } catch (err: any) {
          console.error("Error fetching teachers:", err);
          Swal.fire("Error", "Failed to fetch teachers.", "error");
        }
      };

      const fetchSchools = async () => {
        try {
          const data = await getSchools(token);
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
    setNewTeacher({
      ...newTeacher,
      teacherData: { ...newTeacher.teacherData, [field]: file },
    });
  };

  // ===== Handle add teacher =====
  const handleAddTeacher = async () => {
  // Validate required fields
  if (!newTeacher.teacherData.firstName || !newTeacher.teacherData.lastName) {
    Swal.fire("Error", "First Name and Last Name are required", "error");
    return;
  }

  setLoading(true);

  Swal.fire({
    title: "Saving Teacher...",
    text: "Please wait",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    // Prepare JSON payload
    const teacherDataPayload = {
      ...newTeacher.teacherData,
      // Convert File objects to their server path (or keep existing paths)
      medicalCertificate:
        typeof newTeacher.teacherData.medicalCertificate === "string"
          ? newTeacher.teacherData.medicalCertificate
          : "/uploads/teachers/docs/medical.pdf",
      academicQualifications:
        typeof newTeacher.teacherData.academicQualifications === "string"
          ? newTeacher.teacherData.academicQualifications
          : "/uploads/teachers/docs/academic.pdf",
      professionalQualifications:
        typeof newTeacher.teacherData.professionalQualifications === "string"
          ? newTeacher.teacherData.professionalQualifications
          : "/uploads/teachers/docs/professional.pdf",
    };

    const payload = {
      role: newTeacher.role,
      teacherData: teacherDataPayload,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    // Send JSON request
    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const saved = await response.json();

    if (!response.ok) {
      throw new Error(saved.message || "Failed to save teacher");
    }

    setTeachers([...teachers, saved]);

    // Reset form
    setNewTeacher({
      role: "teacher",
      teacherData: Object.fromEntries(
        Object.keys(newTeacher.teacherData).map((key) => [
          key,
          ["medicalCertificate", "academicQualifications", "professionalQualifications"].includes(key)
            ? null
            : "",
        ])
      ),
    });

    setIsModalOpen(false);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Teacher added successfully 🎉",
    });
  } catch (err: any) {
    Swal.fire({ icon: "error", title: "Error", text: err.message || "Something went wrong" });
  } finally {
    setLoading(false);
  }
};


  // ===== Filtering & Pagination =====
  const filteredTeachers = teachers.filter((teacher: any) =>
    Object.values(teacher)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  const searchOptions = Array.from(
    new Set(
      teachers.flatMap((teacher: any) => [
        teacher.firstName,
        teacher.lastName,
        teacher.nrc,
        teacher.tsNo,
        teacher.currentSchoolName,
        teacher.currentPosition,
        teacher.subjectSpecialization,
      ])
    )
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          + Add Teacher
        </button>

        <input
          type="text"
          placeholder="Search teachers..."
          list="teacherSearch"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <datalist id="teacherSearch">
          {searchOptions.map((option, idx) => (
            <option key={idx} value={option} />
          ))}
        </datalist>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {["Name", "NRC No.", "TS No.", "Current School", "Position", "Subject", "Action"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {currentTeachers.map((teacher: any, index: number) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {teacher.firstName} {teacher.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{teacher.nrc}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{teacher.tsNo}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.currentSchoolName ? teacher.currentSchool.name : "-"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{teacher.currentPosition}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.subjectSpecialization}
                </td>
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
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
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
              {/* Text Inputs */}
              {["firstName","lastName","email","nrc","tsNo","address"].map((f) => (
              <div key={f} className="flex flex-col">
                <label className="mb-1 text-gray-300">{f.charAt(0).toUpperCase() + f.slice(1)}</label>
                <input
                  type="text"
                  value={newTeacher.teacherData[f]}
                  onChange={(e) => {
                    const value = f === "nrc" ? formatNRCInput(e.target.value) : e.target.value;
                    setNewTeacher({
                      ...newTeacher,
                      teacherData: { ...newTeacher.teacherData, [f]: value },
                    });
                  }}
                  maxLength={f === "nrc" ? 11 : undefined} // 6+2+1 + 2 slashes = 11
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
                { field: "currentPosition", options: ["Class Teacher", "Subject Teacher", "Senior Teacher", "HOD", "Deputy Head", "Head Teacher"] },
              ].map(({ field, options }) => (
                <div key={field} className="flex flex-col">
                  <label className="mb-1 text-gray-300">{field.replace(/([A-Z])/g, " $1")}</label>
                  <select
                    value={newTeacher.teacherData[field] || ""}
                    onChange={(e) =>
                      setNewTeacher({
                        ...newTeacher,
                        teacherData: { ...newTeacher.teacherData, [field]: e.target.value },
                      })
                    }
                    className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select {field.replace(/([A-Z])/g, " $1")}</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Current School */}
              <div className="flex flex-col">
                <label className="mb-1 text-gray-300">Current School</label>
                <select
                  value={newTeacher.teacherData.currentSchoolId || ""}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      teacherData: { ...newTeacher.teacherData, currentSchoolId: e.target.value },
                    })
                  }
                  className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select School</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.id}>{school.name}</option>
                  ))}
                </select>
              </div>

              

              {/* Subject */}
              <div className="flex flex-col">
                <label className="mb-1 text-gray-300">Subject Specialization</label>
                <select
                  value={newTeacher.teacherData.subjectSpecialization || ""}
                  onChange={(e) =>
                    setNewTeacher({
                      ...newTeacher,
                      teacherData: { ...newTeacher.teacherData, subjectSpecialization: e.target.value },
                    })
                  }
                  className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Subject</option>
                  {[
                    "Mathematics","English","Science","History","Geography","Physical Education",
                    "Biology","Chemistry","Physics","Computer Studies",
                  ].map((sub) => (
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
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(field, e.target.files?.[0] ?? null)}
                    className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddTeacher}
                disabled={loading}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition-colors"
              >
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
