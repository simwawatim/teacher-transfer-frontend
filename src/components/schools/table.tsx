import { useState } from "react";

const SchoolsTable = () => {
  const provinces = {
    Lusaka: ["Lusaka", "Chilanga", "Kafue"],
    "North-Western": ["Mwinilunga", "Solwezi", "Kabompo"],
    Northern: ["Kasama", "Mbala", "Mporokoso"],
    Copperbelt: ["Kitwe", "Ndola", "Chingola", "Mufulira"],
  };

  const initialSchools = [
    { name: "Kyawama Secondary", district: "Lusaka", province: "Lusaka" },
    { name: "Mwinilunga High", district: "Mwinilunga", province: "North-Western" },
    { name: "Solwezi High", district: "Solwezi", province: "North-Western" },
    { name: "Kasama Girls", district: "Kasama", province: "Northern" },
  ];

  const [schools, setSchools] = useState(initialSchools);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newSchool, setNewSchool] = useState({ name: "", district: "", province: "" });

  const itemsPerPage = 10;

  const filteredSchools = schools.filter((school) =>
    Object.values(school).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentSchools = filteredSchools.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSchools.length / itemsPerPage);

  const handleAddSchool = () => {
    if (!newSchool.name || !newSchool.district || !newSchool.province) return;
    if (!schools.some((s) => s.name === newSchool.name)) {
      setSchools([...schools, newSchool]);
    }
    setNewSchool({ name: "", district: "", province: "" });
    setShowModal(false);
  };

  const searchOptions = Array.from(
    new Set(
      schools.flatMap((school) => [school.name, school.district, school.province])
    )
  );

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-blue-700"
        >
          + Add School
        </button>
        <input
          type="text"
          placeholder="Search schools..."
          list="schoolSearch"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <datalist id="schoolSearch">
          {searchOptions.map((option, idx) => (
            <option key={idx} value={option} />
          ))}
        </datalist>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">School Name</th>
            <th className="px-6 py-3">District</th>
            <th className="px-6 py-3">Province</th>
          </tr>
        </thead>
        <tbody>
          {currentSchools.map((school, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {school.name}
              </td>
              <td className="px-6 py-4">{school.district}</td>
              <td className="px-6 py-4">{school.province}</td>
            </tr>
          ))}
        </tbody>
      </table>

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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Add New School</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="School Name"
                value={newSchool.name}
                onChange={(e) =>
                  setNewSchool({ ...newSchool, name: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />

              <input
                list="provinces"
                placeholder="Select Province"
                value={newSchool.province}
                onChange={(e) =>
                  setNewSchool({ ...newSchool, province: e.target.value, district: "" })
                }
                className="px-3 py-2 border rounded"
              />
              <datalist id="provinces">
                {Object.keys(provinces).map((prov, idx) => (
                  <option key={idx} value={prov} />
                ))}
              </datalist>

              <input
                list="districts"
                placeholder="Select District"
                value={newSchool.district}
                onChange={(e) =>
                  setNewSchool({ ...newSchool, district: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <datalist id="districts">
                {newSchool.province &&
                  provinces[newSchool.province as keyof typeof provinces]?.map((dist: string, idx: number) => (
                    <option key={idx} value={dist} />
                  ))}
              </datalist>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSchool}
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

export default SchoolsTable;
