"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { HiAcademicCap, HiLocationMarker, HiOutlineOfficeBuilding } from "react-icons/hi"
import { fetchTransferById, updateTransferStatus, TransferResponse } from "../../api/transfer/transfers";
import { IMAGE_BASE_URL } from "../../api/base/base"

const TransferViewLayout: React.FC = () => {
  const router = useRouter();
  const [transfer, setTransfer] = useState<TransferResponse | null>(null);
  const [status, setStatus] = useState<"approved" | "rejected">("approved");
  const [reason, setReason] = useState("");

  const { id } = router.query;

  useEffect(() => {
    if (!id) return; 

    const loadTransfer = async () => {
      try {
        const data = await fetchTransferById(id as string);
        if (typeof data.teacher.experience === "string") {
          data.teacher.experience = JSON.parse(data.teacher.experience);
        }
        setTransfer(data);
        setStatus(data.status as "approved" | "rejected");
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load transfer data", "error");
      }
    };

    loadTransfer();
  }, [id]);

  const handleStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transfer) return;

    try {
      await updateTransferStatus(transfer.id, status, reason);
      Swal.fire("Success", "Transfer status updated", "success");
      setTransfer({ ...transfer, status }); // update local state
    } catch (err: any) {
      Swal.fire("Error", err.message || "Failed to update status", "error");
    }
  };

  if (!transfer) return <div className="p-6 text-center">Loading...</div>;

  const { teacher, fromSchool, toSchool } = transfer;

  return (
    <section className="py-8 bg-white dark:bg-gray-900 min-h-screen w-full">
      <div className="max-w-full mx-auto px-4 space-y-6">
        {/* Profile + Schools */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
          {/* Profile */}
          <div className="md:col-span-1 p-6 bg-gray-50 dark:bg-gray-800 h-64 flex flex-col items-center justify-between rounded-lg shadow-sm">
            <div className="flex justify-center mb-2">
              <img
                className="w-24 h-24 rounded-full object-cover"
                src={teacher.profilePicture || "/blank-male.jpg"}
                alt="Profile"
              />
            </div>
            <h5 className="mb-2 text-lg font-bold text-gray-900 dark:text-white text-center">
              {teacher.firstName} {teacher.lastName}
            </h5>
           <span
            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full select-none 
              ${
                transfer.status === "pending"
                  ? "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-200"
                  : transfer.status === "approved"
                  ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200"
                  : transfer.status === "rejected"
                  ? "bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-200"
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }
              cursor-not-allowed
            `}
          >
            {transfer.status.toUpperCase()}
          </span>


          </div>

          {/* Schools */}
          <div className="md:col-span-3 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm h-auto">
            <div className="flex flex-wrap gap-6">
              {/* From School */}
              <div className="flex-1 min-w-[300px] p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h5 className="flex items-center text-xl font-bold text-gray-900 dark:text-white mb-4">
                  <HiAcademicCap className="mr-2 text-blue-500" /> From School
                </h5>
                {fromSchool || teacher.currentSchool ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-3 flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                        <HiOutlineOfficeBuilding className="mr-1 text-gray-400" />
                        {fromSchool?.name || teacher.currentSchool?.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <HiLocationMarker className="mr-1 text-gray-400" />
                        {fromSchool?.province || teacher.currentSchool?.province} {/* Use fromSchool.province, not teacher.currentSchoolType.Province */}
                      </p>
                    </div>
                    <span className="text-base font-semibold text-gray-900 dark:text-white flex items-center">
                      <HiLocationMarker className="mr-1 text-gray-400" />
                      {fromSchool?.district || teacher.currentSchool?.district}
                    </span>
                  </li>
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 flex items-center">
                  <HiOutlineOfficeBuilding className="mr-2" /> No From School
                </p>
              )}

              </div>

              {/* To School */}
              <div className="flex-1 min-w-[300px] p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h5 className="flex items-center text-xl font-bold text-gray-900 dark:text-white mb-4">
                  <HiAcademicCap className="mr-2 text-green-500" /> To School
                </h5>
                {toSchool ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          <HiOutlineOfficeBuilding className="mr-1 text-gray-400" />
                          {toSchool.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <HiLocationMarker className="mr-1 text-gray-400" />
                          {toSchool.province}
                        </p>
                      </div>
                      <span className="text-base font-semibold text-gray-900 dark:text-white flex items-center">
                        <HiLocationMarker className="mr-1 text-gray-400" />
                        {toSchool.district}
                      </span>
                    </li>
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 flex items-center">
                    <HiOutlineOfficeBuilding className="mr-2" /> No To School
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Files + Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
          {/* Files */}
         <div className="md:col-span-1 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm h-64">
          <div className="grid grid-cols-2 gap-4 h-full">
            {teacher.medicalCertificate && (
              <a
                href={`${IMAGE_BASE_URL}${teacher.medicalCertificate}`}
                target="_blank"
                className="rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm"
              >
                Medical
              </a>
            )}
            {teacher.academicQualifications && (
              <a
                href={`${IMAGE_BASE_URL}${teacher.academicQualifications}`}
                target="_blank"
                className="rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm"
              >
                Academic
              </a>
            )}
            {teacher.professionalQualifications && (
              <a
                href={`${IMAGE_BASE_URL}${teacher.professionalQualifications}`}
                target="_blank"
                className="col-span-2 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm"
              >
                Professional
              </a>
            )}
          </div>
        </div>

          {/* Personal Info */}
          <div className="md:col-span-3 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm h-auto">
            <div className="flex flex-wrap gap-6">
              {/* Personal */}
              <div className="flex-1 min-w-[300px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h5 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Personal Info</h5>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">First Name:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.firstName}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Last Name:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.lastName}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Address:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.address}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Marital Status:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.maritalStatus}</span></li>
                </ul>
              </div>

              {/* Contact */}
              <div className="flex-1 min-w-[300px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h5 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contact Info</h5>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Email:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.email}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">NRC:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.nrc}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">TS Number:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.tsNo}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Specialization:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.subjectSpecialization}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Status Form */}
       {transfer.status === "pending" && (
        <div className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="w-full p-6 rounded-xl shadow-md flex flex-col">
            <h5 className="mb-6 text-xl font-semibold text-gray-700 dark:text-gray-300">
              Update Status
            </h5>
            <form onSubmit={handleStatusUpdate} className="flex flex-col gap-5 w-full">
              <div className="w-full">
                <label className="block mb-1 text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "approved" | "rejected")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                </select>
              </div>
              <div className="w-full">
                <label className="block mb-1 text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Reason
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  placeholder="Enter reason..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2 w-full transition-all duration-200"
              >
                Update Status
              </button>
            </form>
          </div>
        </div>
      )}

      </div>
    </section>
  );
};

export default TransferViewLayout;
