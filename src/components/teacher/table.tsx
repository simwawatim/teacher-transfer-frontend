import Link from "next/link";
import { useState } from "react";

const TeachersTable = () => {
  const initialTeachers = [
    {
      name: "John Mwansa",
      nrc: "123456/11/1",
      tsNo: "TS00123",
      school: "Kyawama Secondary",
      position: "Subject Teacher",
      subject: "Mathematics",
      experience: "5 yrs",
    },
    {
      name: "Mary Banda",
      nrc: "987654/22/2",
      tsNo: "TS00456",
      school: "Mwinilunga High",
      position: "Head Teacher",
      subject: "English",
      experience: "12 yrs",
    },
    {
      name: "James Phiri",
      nrc: "456789/33/3",
      tsNo: "TS00789",
      school: "Solwezi High",
      position: "Deputy Teacher",
      subject: "Science",
      experience: "8 yrs",
    },
    {
      name: "Lucy Chanda",
      nrc: "654321/44/4",
      tsNo: "TS00999",
      school: "Kasama Girls",
      position: "Senior Teacher",
      subject: "Biology",
      experience: "10 yrs",
    },
  ];

  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    nrc: "",
    tsNo: "",
    school: "",
    position: "",
    subject: "",
    experience: "",
  });

  const itemsPerPage = 10;

  // Filter teachers by search term
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

  const handleAddTeacher = () => {
    setTeachers([...teachers, newTeacher]);
    setNewTeacher({
      name: "",
      nrc: "",
      tsNo: "",
      school: "",
      position: "",
      subject: "",
      experience: "",
    });
    setShowModal(false);
  };

  // Build autocomplete options for search
  const searchOptions = Array.from(
    new Set(
      teachers.flatMap((teacher) => [
        teacher.name,
        teacher.nrc,
        teacher.tsNo,
        teacher.school,
        teacher.position,
        teacher.subject,
      ])
    )
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          + Add Teacher
        </button>

        {/* Search with autocomplete */}
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
                "Experience",
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
            {currentTeachers.map((teacher, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {teacher.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.nrc}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.tsNo}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.school}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.position}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.subject}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {teacher.experience}
                </td>
                <td className="px-6 py-4 text-sm text-indigo-600 hover:text-indigo-900">
                  <Link href={`/teachers/${teacher.nrc.split("/")[0]}`}>View</Link>
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
      {showModal && (
      <div className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50">
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
          <h2 className="text-lg font-bold mb-4 text-white">Add New Teacher</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={newTeacher.name}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, name: e.target.value })
              }
              className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            {/* NRC */}
            <input
              type="text"
              placeholder="NRC No."
              value={newTeacher.nrc}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, nrc: e.target.value })
              }
              className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            {/* TS No */}
            <input
              type="text"
              placeholder="TS No."
              value={newTeacher.tsNo}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, tsNo: e.target.value })
              }
              className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            {/* School */}
            <input
              list="schools"
              placeholder="Select School"
              value={newTeacher.school}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, school: e.target.value })
              }
              className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <datalist id="schools">
              <option value="Kyawama Secondary" />
              <option value="Mwinilunga High" />
              <option value="Solwezi High" />
              <option value="Kasama Girls" />
              <option value="Chingola Secondary" />
            </datalist>
            {/* Position */}
            <input
              list="positions"
              placeholder="Select Position"
              value={newTeacher.position}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, position: e.target.value })
              }
              className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <datalist id="positions">
              <option value="Head Teacher" />
              <option value="Deputy Teacher" />
              <option value="Senior Teacher" />
              <option value="Subject Teacher" />
            </datalist>
            {/* Subject */}
            <input
              list="subjects"
              placeholder="Select Subject"
              value={newTeacher.subject}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, subject: e.target.value })
              }
              className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
            />
            <datalist id="subjects">
              <option value="Mathematics" />
              <option value="English" />
              <option value="Science" />
              <option value="Biology" />
              <option value="Geography" />
            </datalist>
            {/* Experience */}
            <input
              type="text"
              placeholder="Experience (e.g. 5 yrs)"
              value={newTeacher.experience}
              onChange={(e) =>
                setNewTeacher({ ...newTeacher, experience: e.target.value })
              }
              className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowModal(false)}
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
