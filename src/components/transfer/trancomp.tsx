import { useState, useEffect } from "react";
import { getTransfers, submitTransfer, TransferResponse } from "../../api/transfer/transfers";
import Link from "next/link";
import Swal from "sweetalert2";

interface ActionData {
  status: string;
  reason: string;
}

interface School {
  id: number;
  name: string;
  code: string;
  district: string;
  province: string;
}

const TransferTable = () => {
  const [teachers, setTeachers] = useState<TransferResponse[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TransferResponse | null>(null);
  const [actionData, setActionData] = useState<ActionData>({ status: "Approved", reason: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const [submittingAction, setSubmittingAction] = useState(false);
  const [submittingRequest, setSubmittingRequest] = useState(false);

  const [transferRequest, setTransferRequest] = useState({
    teacherId: 8,
    toSchoolId: 0,
    reason: "",
  });

  // fetch transfers
  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const data = await getTransfers();
        setTeachers(data);
      } catch (err: any) {
        let errorMsg = "Failed to load transfers";
        if (err.response?.data?.message) {
          errorMsg = err.response.data.message;
        } else if (err.message) {
          errorMsg = err.message;
        }
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchTransfers();
  }, []);

  // fetch schools
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/schools");
        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          throw new Error(errData?.message || "Failed to fetch schools");
        }
        const data = await res.json();
        setSchools(data);
      } catch (err: any) {
        console.error("Failed to fetch schools:", err.message);
        Swal.fire("Error", err.message || "Failed to fetch schools", "error");
      }
    };
    fetchSchools();
  }, []);

  const openActionModal = (teacher: TransferResponse) => {
    setSelectedTeacher(teacher);
    setActionData({ status: teacher.status || "Pending", reason: "" });
    setShowActionModal(true);
  };

  const handleActionSubmit = async () => {
    if (!selectedTeacher) return;
    setSubmittingAction(true);

    Swal.fire({
      title: "Submitting...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await submitTransfer(selectedTeacher.teacher.id, selectedTeacher.toSchoolId || 0);
      setTeachers((prev) =>
        prev.map((t) =>
          t.id === selectedTeacher.id ? { ...t, status: actionData.status } : t
        )
      );
      setShowActionModal(false);
      Swal.fire("Success", "Transfer action submitted successfully!", "success");
    } catch (err: any) {
      let errorMsg = "Failed to submit action";
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }
      Swal.fire("Error", errorMsg, "error");
    } finally {
      setSubmittingAction(false);
      setSelectedTeacher(null);
    }
  };

  const handleRequestTransfer = async () => {
    if (!transferRequest.toSchoolId) {
      Swal.fire("Error", "Please select a new school", "error");
      return;
    }

    setSubmittingRequest(true);

    Swal.fire({
      title: "Submitting...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await submitTransfer(transferRequest.teacherId, transferRequest.toSchoolId);
      const data = await getTransfers();
      setTeachers(data);
      setShowRequestModal(false);
      setTransferRequest({ teacherId: 123, toSchoolId: 0, reason: "" }); // reset
      Swal.fire("Success", "Transfer request submitted successfully!", "success");
    } catch (err: any) {
      let errorMsg = "Failed to submit transfer request";
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message) {
        errorMsg = err.message;
      }
      Swal.fire("Error", errorMsg, "error");
    } finally {
      setSubmittingRequest(false);
    }
  };

  const filteredTeachers = teachers.filter((t) =>
    [t.teacher.firstName, t.teacher.lastName, t.teacher.nrc, t.teacher.currentSchoolName]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center py-4">Loading transfers...</p>;
  if (error) return <p className="text-center py-4 text-red-500">{error}</p>;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search teacher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-1/3 focus:outline-none focus:ring focus:border-indigo-400"
        />
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
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((t) => (
              <tr
                key={t.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {t.teacher.firstName} {t.teacher.lastName}
                </td>
                <td className="px-6 py-4">{t.teacher.nrc}</td>
                <td className="px-6 py-4">{t.teacher.currentSchoolName}</td>
                <td className="px-6 py-4">{t.toSchoolId || "-"}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      t.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : t.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {t.status || "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4">{new Date(t.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-indigo-600 hover:text-indigo-900">
                  <Link href={`/transfer-view/${t.id}`}>View</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No teachers found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-white font-bold mb-4">Request Transfer</h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Static teacher */}
              <p className="text-white">Teacher ID: {transferRequest.teacherId}</p>

              {/* School dropdown */}
              <select
                value={transferRequest.toSchoolId}
                onChange={(e) =>
                  setTransferRequest({ ...transferRequest, toSchoolId: Number(e.target.value) })
                }
                className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
              >
                <option value={0}>Select School</option>
                {schools.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Reason for Transfer"
                value={transferRequest.reason}
                onChange={(e) =>
                  setTransferRequest({ ...transferRequest, reason: e.target.value })
                }
                className="px-3 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowRequestModal(false)}
                disabled={submittingRequest}
                className="px-4 py-2 bg-red-400 text-white rounded hover:bg-gray-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestTransfer}
                disabled={submittingRequest}
                className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {submittingRequest ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferTable;
