"use client";
import { useState } from "react";

const TransferViewComp = () => {
  const transferData = {
    name: "John Mwansa",
    nrc: "123456111",
    tsNo: "TS00123",
    address: "Plot 12, Kitwe, Zambia",
    maritalStatus: "Married",
    medicalCertificate: "Certified (Valid)",
    academicQualifications: "Grade 12 Certificate",
    professionalQualifications: "Secondary Diploma, Secondary Degree",
    currentSchool: "Secondary",
    schoolName: "Kyawama Secondary",
    newSchool: "Kasama Secondary",
    currentPosition: "Subject Teacher",
    subjectSpecialization: "Mathematics",
    transferDate: "2025-09-01",
    experience: [
      { school: "Kyawama Secondary", years: 5 },
      { school: "Ndeke Secondary", years: 3 },
    ],
    transferStatus: "Pending",
    statusReason: "Awaiting approval from District Education Board Secretary",
  };

  const [status, setStatus] = useState(transferData.transferStatus);
  const [reason, setReason] = useState(transferData.statusReason);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Status:", status);
    console.log("Updated Reason:", reason);
    alert("Status updated!");
  };

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 space-y-8">
        
        {/* Transfer Status on Top */}
        <div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Transfer Application Status
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full 
                ${
                  status === "Approved"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                    : status === "Rejected"
                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                }`}
            >
              {status}
            </span>
          </div>
          {reason && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{reason}</p>
          )}
        </div>

        {/* SECOND ROW: Picture + From/To/Date */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Profile image */}
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

          {/* From → To → Date */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard label="From School" value={transferData.schoolName} />
            <InfoCard label="To School" value={transferData.newSchool} />
            <InfoCard label="Transfer Date" value={transferData.transferDate} />
          </div>
        </div>

        {/* Applicant Details */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            {transferData.name}
          </h1>
          <p className="text-lg text-primary-700 dark:text-primary-400">
            {transferData.currentPosition} - {transferData.schoolName}
          </p>

          {/* More details */}
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
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Experience
            </h3>
            <ul className="list-disc ps-6 space-y-2 text-gray-600 dark:text-gray-400">
              {transferData.experience.map((exp, idx) => (
                <li key={idx}>
                  {exp.school} —{" "}
                  <span className="font-medium">{exp.years} years</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Update Status Form at the Bottom */}
        <div className="w-full p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Update Status
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-700 dark:text-gray-300 font-medium">
                    Status:
                </label>
                <select
                    className="border rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 w-full"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Pending">Pending</option>
                </select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                <label className="text-gray-700 dark:text-gray-300 font-medium">
                    Reason:
                </label>
                <textarea
                    className="border rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 w-full resize-none"
                    rows={4}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason here..."
                />
                </div>

                <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                Update Status
                </button>
            </form>
            </div>

      </div>
    </section>
  );
};

/* Reusable InfoCard Component */
const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-gray-900 dark:text-white font-medium text-sm">{value}</p>
  </div>
);

export default TransferViewComp;
