import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getTeachers,
  addTeacher,
  Teacher,
} from "../../api/teachers/teachers"; // 👈 adjust path

const TeachersTable = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTeacher, setNewTeacher] = useState<any>({
    username: "",
    password: "",
    role: "teacher", // fixed
    teacherData: {
      firstName: "",
      lastName: "",
      email: "",
      nrc: "",
      tsNo: "",
      address: "",
      maritalStatus: "",
      medicalCertificate: "",
      academicQualifications: "",
      professionalQualifications: "",
      currentSchoolType: "",
      currentSchoolName: "",
      currentPosition: "",
      subjectSpecialization: "",
      currentSchoolId: "",
    },
  });

  const itemsPerPage = 10;

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };
    fetchTeachers();
  }, []);

  // Add teacher
  const handleAddTeacher = async () => {
    try {
      const saved = await addTeacher(newTeacher);
      setTeachers([...teachers, saved]);
      setNewTeacher({
        username: "",
        password: "",
        role: "teacher",
        teacherData: {
          firstName: "",
          lastName: "",
          email: "",
          nrc: "",
          tsNo: "",
          address: "",
          maritalStatus: "",
          medicalCertificate: "",
          academicQualifications: "",
          professionalQualifications: "",
          currentSchoolType: "",
          currentSchoolName: "",
          currentPosition: "",
          subjectSpecialization: "",
          currentSchoolId: "",
        },
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving teacher:", err);
    }
  };

  // Filter + pagination
  const filteredTeachers = teachers.filter((teacher) =>
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
      {/* Top controls */}
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
              {[
                "Name",
                "NRC No.",
                "TS No.",
                "Current School",
                "Position",
                "Subject",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {currentTeachers.map((teacher: any, index: number) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {teacher.firstName} {teacher.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.nrc}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.tsNo}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.currentSchoolName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.currentPosition}
                </td>
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

        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50">
            <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-4xl"> {/* Slightly wider */}
              <h2 className="text-lg font-bold mb-4 text-white">Add New Teacher</h2>

              {/* Username + Password */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={newTeacher.username}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, username: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newTeacher.password}
                  onChange={(e) =>
                    setNewTeacher({ ...newTeacher, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
                />
              </div>

              {/* TeacherData */}
              <div className="grid grid-cols-3 gap-4">
                {Object.keys(newTeacher.teacherData).map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    value={newTeacher.teacherData[field]}
                    onChange={(e) =>
                      setNewTeacher({
                        ...newTeacher,
                        teacherData: {
                          ...newTeacher.teacherData,
                          [field]: e.target.value,
                        },
                      })
                    }
                    className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTeacher}
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default TeachersTable;
