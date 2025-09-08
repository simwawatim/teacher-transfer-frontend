{/* Modal */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
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
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
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
