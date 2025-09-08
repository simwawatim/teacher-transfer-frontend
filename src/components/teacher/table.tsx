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
      teachers.flatMap((teacher) =>
        [teacher.name, teacher.nrc, teacher.tsNo, teacher.school, teacher.position, teacher.subject]
      )
    )
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-blue-700"
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">NRC No.</th>
            <th className="px-6 py-3">TS No.</th>
            <th className="px-6 py-3">Current School</th>
            <th className="px-6 py-3">Position</th>
            <th className="px-6 py-3">Subject</th>
            <th className="px-6 py-3">Experience</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTeachers.map((teacher, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {teacher.name}
              </td>
              <td className="px-6 py-4">{teacher.nrc}</td>
              <td className="px-6 py-4">{teacher.tsNo}</td>
              <td className="px-6 py-4">{teacher.school}</td>
              <td className="px-6 py-4">{teacher.position}</td>
              <td className="px-6 py-4">{teacher.subject}</td>
              <td className="px-6 py-4">{teacher.experience}</td>
              <td className="px-6 py-4">
                <Link href={`/teachers/${teacher.nrc.split("/")[0]}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Add New Teacher</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <input
                type="text"
                placeholder="Full Name"
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              {/* NRC */}
              <input
                type="text"
                placeholder="NRC No."
                value={newTeacher.nrc}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, nrc: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              {/* TS No */}
              <input
                type="text"
                placeholder="TS No."
                value={newTeacher.tsNo}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, tsNo: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              {/* School (autocomplete) */}
              <input
                list="schools"
                placeholder="Select School"
                value={newTeacher.school}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, school: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <datalist id="schools">
                <option value="Kyawama Secondary" />
                <option value="Mwinilunga High" />
                <option value="Solwezi High" />
                <option value="Kasama Girls" />
                <option value="Chingola Secondary" />
              </datalist>
              {/* Position (autocomplete) */}
              <input
                list="positions"
                placeholder="Select Position"
                value={newTeacher.position}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, position: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <datalist id="positions">
                <option value="Head Teacher" />
                <option value="Deputy Teacher" />
                <option value="Senior Teacher" />
                <option value="Subject Teacher" />
              </datalist>
              {/* Subject (autocomplete) */}
              <input
                list="subjects"
                placeholder="Select Subject"
                value={newTeacher.subject}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, subject: e.target.value })
                }
                className="px-3 py-2 border rounded"
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
                className="px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTeacher}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
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
