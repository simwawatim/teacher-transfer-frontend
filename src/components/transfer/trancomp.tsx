import { useState } from "react";

interface Teacher {
  name: string;
  nrc: string;
  tsNo: string;
  currentSchool: string;
  newSchool: string;
  position: string;
  subject: string;
  experience: string;
  status: string;
  date: string;
  reason: string;
}

interface ActionData {
  status: string;
  reason: string;
}

const TransferTable = () => {
  const initialTeachers: Teacher[] = [
    {
      name: "John Mwansa",
      nrc: "123456/11/1",
      tsNo: "TS00123",
      currentSchool: "Kyawama Secondary",
      newSchool: "",
      position: "Subject Teacher",
      subject: "Mathematics",
      experience: "5 yrs",
      status: "Pending",
      date: "",
      reason: "",
    },
    {
      name: "Mary Banda",
      nrc: "987654/22/2",
      tsNo: "TS00456",
      currentSchool: "Mwinilunga High",
      newSchool: "",
      position: "Head Teacher",
      subject: "English",
      experience: "12 yrs",
      status: "Pending",
      date: "",
      reason: "",
    },
  ];

  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [transferRequest, setTransferRequest] = useState({
    nrc: "",
    currentSchool: "",
    newSchool: "",
    reason: "",
  });
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [actionData, setActionData] = useState<ActionData>({
    status: "Approved",
    reason: "",
  });

  // Handle transfer request submission
  const handleRequestTransfer = () => {
    const today = new Date().toISOString().split("T")[0];
    setTeachers((prev) =>
      prev.map((t) =>
        t.nrc === transferRequest.nrc
          ? {
              ...t,
              newSchool: transferRequest.newSchool,
              status: "Pending",
              date: today,
              reason: transferRequest.reason,
            }
          : t
      )
    );
    setTransferRequest({ nrc: "", currentSchool: "", newSchool: "", reason: "" });
    setShowRequestModal(false);
  };

  // Open admin action modal
  const openActionModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setActionData({ status: "Approved", reason: teacher.reason || "" });
    setShowActionModal(true);
  };

  // Handle approve/reject submission
  const handleActionSubmit = () => {
    if (!selectedTeacher) return;
    setTeachers((prev) =>
      prev.map((t) =>
        t.nrc === selectedTeacher.nrc
          ? { ...t, status: actionData.status, reason: actionData.reason }
          : t
      )
    );
    setSelectedTeacher(null);
    setShowActionModal(false);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      {/* Request Transfer Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowRequestModal(true)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-blue-700"
        >
          + Request Transfer
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">NRC No.</th>
            <th className="px-6 py-3">Current School</th>
            <th className="px-6 py-3">New School</th>
            <th className="px-6 py-3">Position</th>
            <th className="px-6 py-3">Subject</th>
            <th className="px-6 py-3">Experience</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Reason</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{teacher.name}</td>
              <td className="px-6 py-4">{teacher.nrc}</td>
              <td className="px-6 py-4">{teacher.currentSchool}</td>
              <td className="px-6 py-4">{teacher.newSchool || "-"}</td>
              <td className="px-6 py-4">{teacher.position}</td>
              <td className="px-6 py-4">{teacher.subject}</td>
              <td className="px-6 py-4">{teacher.experience}</td>
              <td className="px-6 py-4">{teacher.status}</td>
              <td className="px-6 py-4">{teacher.date || "-"}</td>
              <td className="px-6 py-4">{teacher.reason || "-"}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => openActionModal(teacher)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Take Action
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Transfer Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">Request Transfer</h2>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="NRC No."
                value={transferRequest.nrc}
                onChange={(e) =>
                  setTransferRequest({ ...transferRequest, nrc: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="Current School"
                value={transferRequest.currentSchool}
                onChange={(e) =>
                  setTransferRequest({ ...transferRequest, currentSchool: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="text"
                placeholder="New School"
                value={transferRequest.newSchool}
                onChange={(e) =>
                  setTransferRequest({ ...transferRequest, newSchool: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
              <textarea
                placeholder="Reason for Transfer"
                value={transferRequest.reason}
                onChange={(e) =>
                  setTransferRequest({ ...transferRequest, reason: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowRequestModal(false)}
                className="px-4 py-2 bg-red-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestTransfer}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Action Modal */}
      {showActionModal && selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Action on {selectedTeacher.name}</h2>
            <div className="grid grid-cols-1 gap-4">
              <select
                value={actionData.status}
                onChange={(e) =>
                  setActionData({ ...actionData, status: e.target.value })
                }
                className="px-3 py-2 border rounded"
              >
                <option value="Approved">Approve</option>
                <option value="Rejected">Reject</option>
              </select>
              <textarea
                placeholder="Reason"
                value={actionData.reason}
                onChange={(e) =>
                  setActionData({ ...actionData, reason: e.target.value })
                }
                className="px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowActionModal(false)}
                className="px-4 py-2 bg-red-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleActionSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferTable;
