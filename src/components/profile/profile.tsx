"use client";

import React, { useEffect, useState } from "react";
import { HiAcademicCap, HiLocationMarker, HiOutlineOfficeBuilding } from "react-icons/hi";
import { IMAGE_BASE_URL, API_BASE_URL } from "../../api/base/base";
import { requireToken } from "@/api/base/token";
import router from "next/router";

interface School {
  id: number;
  name: string | null;
  code: string;
  district: string;
  province: string;
}

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  email: string;
  nrc: string;
  tsNo: string;
  address: string;
  maritalStatus: string;
  medicalCertificate: string | null;
  academicQualifications: string | null;
  professionalQualifications: string | null;
  currentPosition: string;
  subjectSpecialization: string;
  currentSchoolId: number;
  currentSchool: School | null;
}

const TeacherProfilePage: React.FC<{ teacherId: number }> = ({ teacherId }) => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    address: "",
    maritalStatus: "",
  });
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      const token = requireToken(router);
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/teachers/${teacherId}`, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch teacher data");
        const data = await res.json();
        setTeacher(data);
        setFormData({
          email: data.email,
          address: data.address,
          maritalStatus: data.maritalStatus,
        });
        setPreviewImage(data.profilePicture ? `${IMAGE_BASE_URL}/${data.profilePicture}` : null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacher();
  }, [teacherId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    const token = requireToken(router);
    if (!token || !teacher) return;
    try {
      const dataToSend = new FormData();
      dataToSend.append("email", formData.email);
      dataToSend.append("address", formData.address);
      dataToSend.append("maritalStatus", formData.maritalStatus);
      if (profileFile) dataToSend.append("profilePicture", profileFile);

      const res = await fetch(`${API_BASE_URL}/teachers/${teacher.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: dataToSend,
      });

      if (!res.ok) throw new Error("Failed to update teacher");
      const updatedTeacher = await res.json();
      setTeacher(updatedTeacher);
      setModalOpen(false);
      setProfileFile(null);
      alert("Teacher updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating teacher.");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!teacher) return <p className="p-6 text-center">Teacher not found</p>;

  return (
    <section className="py-10 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Column */}
        <div className="md:col-span-1 flex flex-col gap-6">
          {/* Profile Card */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col items-center">
                <img
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md block"
              src={
                previewImage ||
                (teacher.profilePicture
                  ? `${IMAGE_BASE_URL.replace(/\/$/, "")}/${teacher.profilePicture}`
                  : "/blank-male.jpg")
              }
              alt="Profile"
            />

            <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white text-center">
              {teacher.firstName} {teacher.lastName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{teacher.currentPosition}</p>
          </div>

          {/* Files Card */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <h5 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Documents</h5>
            <div className="grid grid-cols-2 gap-4">
              {teacher.medicalCertificate && (
                <a href={`${IMAGE_BASE_URL}${teacher.medicalCertificate}`} target="_blank" className="btn-doc">
                  Medical
                </a>
              )}
              {teacher.academicQualifications && (
                <a href={`${IMAGE_BASE_URL}${teacher.academicQualifications}`} target="_blank" className="btn-doc">
                  Academic
                </a>
              )}
              {teacher.professionalQualifications && (
                <a href={`${IMAGE_BASE_URL}${teacher.professionalQualifications}`} target="_blank" className="btn-doc col-span-2">
                  Professional
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-3 flex flex-col gap-6">
          {/* Personal Info */}
          <div className="card">
            <h5 className="card-title flex justify-between items-center">
              Personal Info
              <button onClick={() => setModalOpen(true)} className="btn-primary">
                Edit
              </button>
            </h5>
            <ul className="info-list">
              <li><span>First Name:</span>{teacher.firstName}</li>
              <li><span>Last Name:</span>{teacher.lastName}</li>
              <li><span>Address:</span>{teacher.address}</li>
              <li><span>Marital Status:</span>{teacher.maritalStatus}</li>
              <li><span>Specialization:</span>{teacher.subjectSpecialization}</li>
            </ul>
          </div>

          {/* Current School */}
          <div className="card">
            <h5 className="card-title flex items-center">
              <HiAcademicCap className="mr-2 text-blue-500" /> Current School
            </h5>
            {teacher.currentSchool && teacher.currentSchool.name ? (
              <div className="info-list">
                <li><span>School:</span>{teacher.currentSchool.name}</li>
                <li><span>Province:</span>{teacher.currentSchool.province}</li>
                <li><span>District:</span>{teacher.currentSchool.district}</li>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No School Assigned</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="card">
            <h5 className="card-title">Contact Info</h5>
            <ul className="info-list">
              <li><span>Email:</span>{teacher.email}</li>
              <li><span>NRC:</span>{teacher.nrc}</li>
              <li><span>TS Number:</span>{teacher.tsNo}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    {/* Background Overlay */}
    <div
      className="absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300"
      onClick={() => setModalOpen(false)}
    ></div>

    {/* Modal Card */}
    <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 scale-100 hover:scale-[1.01]">
      <h5 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
        Update Teacher Info
      </h5>

      <div className="flex flex-col gap-5">
        {/* Profile Picture Upload */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
            Marital Status
          </label>
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setModalOpen(false)}
            className="px-5 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      <style jsx>{`
        .card {
          background: var(--tw-bg-opacity) white;
          background-color: var(--tw-bg-opacity) var(--tw-color-white);
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .card-title {
          font-weight: 600;
          margin-bottom: 1rem;
          color: #1f2937;
        }
        .info-list li {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(229,231,235,0.5);
        }
        .info-list span {
          color: #6b7280;
        }
        .btn-primary {
          background: #2563eb;
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          transition: 0.2s;
        }
        .btn-primary:hover {
          background: #1e40af;
        }
        .btn-secondary {
          background: #e5e7eb;
          color: #111827;
          padding: 0.4rem 1rem;
          border-radius: 0.5rem;
        }
        .btn-doc {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0.7rem;
          border-radius: 0.5rem;
          background: #f3f4f6;
          color: #1f2937;
          font-weight: 500;
          transition: 0.2s;
        }
        .btn-doc:hover {
          background: #2563eb;
          color: white;
        }
        .form-input {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          background: #f9fafb;
          border: 1px solid #d1d5db;
        }
        .form-input:focus {
          border-color: #2563eb;
          outline: none;
        }
        .form-label {
          font-weight: 500;
          color: #374151;
        }
      `}</style>
    </section>
  );
};

export default TeacherProfilePage;
