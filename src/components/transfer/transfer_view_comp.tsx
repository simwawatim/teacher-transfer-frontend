"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchTransferById, updateTransferStatus } from "../../api/transfer/transfers";
import Swal from "sweetalert2";

interface Experience {
  school: string;
  years: number;
}

interface TransferData {
  id: number;
  name: string;
  nrc: string;
  tsNo: string;
  address: string;
  maritalStatus: string;
  medicalCertificate: string;
  academicQualifications: string;
  professionalQualifications: string;
  currentSchool: string;
  schoolName: string;
  newSchool: string;
  currentPosition: string;
  subjectSpecialization: string;
  transferDate: string;
  experience: Experience[];
  transferStatus: string;
  statusReason: string;
}

const TransferViewComp = () => {
  const router = useRouter();
  const { id } = router.query;

  const [transferData, setTransferData] = useState<TransferData | null>(null);
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch transfer data
  useEffect(() => {
    if (!id) return;

    const getTransfer = async () => {
      try {
        const data = await fetchTransferById(id as string);

        const mappedData: TransferData = {
          id: data.id,
          name: `${data.teacher.firstName} ${data.teacher.lastName}`,
          nrc: data.teacher.nrc,
          tsNo: data.teacher.tsNo,
          address: data.teacher.address,
          maritalStatus: data.teacher.maritalStatus,
          medicalCertificate: data.teacher.medicalCertificate,
          academicQualifications: data.teacher.academicQualifications,
          professionalQualifications: data.teacher.professionalQualifications,
          currentSchool: data.teacher.currentSchoolType,
          schoolName: data.teacher.currentSchoolName,
          newSchool: data.toSchool?.name || "",
          currentPosition: data.teacher.currentPosition,
          subjectSpecialization: data.teacher.subjectSpecialization,
          transferDate: new Date(data.createdAt).toLocaleDateString(),
          experience: JSON.parse(data.teacher.experience),
          transferStatus: data.status,
          statusReason: data.statusReason || "",
        };

        setTransferData(mappedData);
        setStatus(mappedData.transferStatus);
        setReason(mappedData.statusReason);
        setLoading(false);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "❌ Failed to fetch transfer data.",
        });
        setLoading(false);
      }
    };

    getTransfer();
  }, [id]);

  // Handle update request
  const handleUpdate = async () => {
    if (!id) return;

    try {
      const normalizedStatus = status.toLowerCase();
      if (!["approved", "rejected"].includes(normalizedStatus)) {
        Swal.fire({
          icon: "warning",
          title: "Invalid Status",
          text: "❌ Status must be Approved or Rejected.",
        });
        return;
      }

      await updateTransferStatus(Number(id), normalizedStatus as "approved" | "rejected", reason);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "✅ Status updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setTransferData((prev) =>
        prev ? { ...prev, transferStatus: normalizedStatus, statusReason: reason } : prev
      );
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.message || "❌ Something went wrong while updating status",
      });
    }
  };

  // Confirm update with SweetAlert
  const confirmUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to mark this request as ${status}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleUpdate();
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading transfer data...</p>;
  if (!transferData) return <p className="text-center mt-10 text-red-600">Transfer not found!</p>;

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 space-y-8">
        {/* Transfer Status */}
        <div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Transfer Application Status</h3>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                transferData.transferStatus.toLowerCase() === "approved"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : transferData.transferStatus.toLowerCase() === "rejected"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
              }`}
            >
              {transferData.transferStatus}
            </span>
          </div>
          {transferData.statusReason && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{transferData.statusReason}</p>
          )}
        </div>

        {/* Profile + From/To */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative w-40 h-40">
            <img
              className="w-40 h-40 object-cover rounded-full shadow-md dark:shadow-gray-800"
              src="../blank-male.jpg"
              alt={`${transferData.name}, ${transferData.currentPosition}`}
            />
            <div className="absolute bottom-2 right-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              Transfer Applicant
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard label="From School" value={transferData.schoolName} />
            <InfoCard label="To School" value={transferData.newSchool} />
            <InfoCard label="Transfer Date" value={transferData.transferDate} />
          </div>
        </div>

        {/* Applicant Details */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">{transferData.name}</h1>
          <p className="text-lg text-primary-700 dark:text-primary-400">
            {transferData.currentPosition} - {transferData.schoolName}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <InfoCard label="NRC Number" value={transferData.nrc} />
            <InfoCard label="TS Number" value={transferData.tsNo} />
            <InfoCard label="Address" value={transferData.address} />
            <InfoCard label="Marital Status" value={transferData.maritalStatus} />
            <InfoCard label="Medical Certificate" value={transferData.medicalCertificate} />
            <InfoCard label="Academic Qualifications" value={transferData.academicQualifications} />
            <InfoCard label="Professional Qualifications" value={transferData.professionalQualifications} />
            <InfoCard label="Current School Type" value={transferData.currentSchool} />
            <InfoCard label="Subject Specialization" value={transferData.subjectSpecialization} />
          </div>

          {/* Experience */}
          <div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Experience</h3>
            <ul className="list-disc ps-6 space-y-2 text-gray-600 dark:text-gray-400">
              {transferData.experience.map((exp, idx) => (
                <li key={idx}>
                  {exp.school} — <span className="font-medium">{exp.years} years</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Update Status Form: Only show if current status is pending */}
        {transferData.transferStatus.toLowerCase() === "pending" && (
          <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-b pb-2">
              Update Transfer Status
            </h3>

            <form onSubmit={confirmUpdate} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Approved">✅ Approved</option>
                  <option value="Rejected">❌ Rejected</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Reason</label>
                <textarea
                  className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason here..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Update Status
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-gray-900 dark:text-white font-medium text-sm">{value}</p>
  </div>
);

export default TransferViewComp;
