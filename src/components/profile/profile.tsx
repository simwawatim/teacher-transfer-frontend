"use client";
import React, { useEffect, useState } from "react";
import { HiAcademicCap, HiLocationMarker, HiOutlineOfficeBuilding } from "react-icons/hi";
import { IMAGE_BASE_URL } from "../../api/base/base";

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

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/teachers/${teacherId}`);
        if (!res.ok) throw new Error("Failed to fetch teacher data");
        const data = await res.json();
        setTeacher(data);
        setFormData({
          email: data.email,
          address: data.address,
          maritalStatus: data.maritalStatus,
        });
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

  const handleSave = async () => {
    if (!teacher) return;
    try {
      const res = await fetch(`http://localhost:4000/api/teachers/${teacher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update teacher");
      const updatedTeacher = await res.json();
      setTeacher(updatedTeacher);
      setModalOpen(false);
      alert("Teacher updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating teacher.");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!teacher) return <p className="p-6 text-center">Teacher not found</p>;

  return (
    <section className="py-8 bg-white dark:bg-gray-900 min-h-screen w-full">
      <div className="max-w-full mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full h-full">

          {/* Left Column: Profile + Files */}
          <div className="md:col-span-1 flex flex-col gap-6 h-full">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-between rounded-lg shadow-sm h-64">
              <img
                className="w-24 h-24 rounded-full object-cover mb-2"
                src={teacher.profilePicture || "/blank-male.jpg"}
                alt="Profile"
              />
              <h5 className="text-lg font-bold text-gray-900 dark:text-white text-center">
                {teacher.firstName} {teacher.lastName}
              </h5>
              <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-not-allowed">
                {teacher.currentPosition}
              </span>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm flex-1">
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
          </div>

          {/* Right Column: Combined Info */}
          <div className="md:col-span-3 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm flex flex-col gap-6 h-full">

            {/* Personal Info */}
            <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h5 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex justify-between items-center">
                Personal Info
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  Edit
                </button>
              </h5>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">First Name:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.firstName}</span></li>
                <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Last Name:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.lastName}</span></li>
                <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Address:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.address}</span></li>
                <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Marital Status:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.maritalStatus}</span></li>
                <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Specialization:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.subjectSpecialization}</span></li>
              </ul>
            </div>

            {/* Current School */}
            <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h5 className="flex items-center text-xl font-bold mb-4 text-gray-900 dark:text-white">
                <HiAcademicCap className="mr-2 text-blue-500" /> Current School
              </h5>
              {teacher.currentSchool && teacher.currentSchool.name ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-3 flex justify-between items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                        <HiOutlineOfficeBuilding className="mr-1 text-gray-400" />
                        {teacher.currentSchool.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <HiLocationMarker className="mr-1 text-gray-400" />
                        {teacher.currentSchool.province}
                      </p>
                    </div>
                    <span className="text-base font-semibold text-gray-900 dark:text-white flex items-center">
                      <HiLocationMarker className="mr-1 text-gray-400" />
                      {teacher.currentSchool.district}
                    </span>
                  </li>
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 flex items-center">
                  <HiOutlineOfficeBuilding className="mr-2" /> No School Assigned
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex-1 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h5 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contact Info</h5>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Email:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.email}</span></li>
                <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">NRC:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.nrc}</span></li>
                <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">TS Number:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.tsNo}</span></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h5 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Update Teacher Info</h5>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-gray-900 dark:text-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-gray-900 dark:text-white dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1">Marital Status</label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-gray-900 dark:text-white dark:bg-gray-700"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default TeacherProfilePage;
