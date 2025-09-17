"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { 
  HiMail, HiLocationMarker, HiUser, HiOfficeBuilding, 
  HiAcademicCap, HiDocumentText, HiClipboardList 
} from "react-icons/hi";
import { getTeacherById, Teacher, getProfilePictureUrl } from "../../api/teachers/teachers";
import { IMAGE_BASE_URL } from "../../api/base/base";

interface TeacherViewProps {
  teacherId?: string;
}

const TeacherViewLayout: React.FC<TeacherViewProps> = ({ teacherId }) => {
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = teacherId || (router.query.id as string);
    if (!id) return;

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    const loadTeacher = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTeacherById(id, token);
        if (!data) setError("Teacher not found");
        else {
          setTeacher({
            ...data,
            experience: Array.isArray(data.experience)
              ? data.experience
              : JSON.parse(data.experience || "[]"),
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load teacher data.");
      } finally {
        setLoading(false);
      }
    };

    loadTeacher();
  }, [teacherId, router.query.id]);

  if (!teacherId && !router.query.id) return <div className="text-center py-10">No teacher ID provided</div>;
  if (loading) return <p className="text-center py-10">Loading teacher data...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!teacher) return <p className="text-center py-10">Teacher not found.</p>;

  const iconColor = "text-indigo-500";

  return (
    <section className="py-8 bg-white dark:bg-gray-900 min-h-screen w-full">
      <div className="max-w-full mx-auto px-4 space-y-6">

        {/* Top Row: Profile + Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
          {/* Profile */}
          <div className="md:col-span-1 p-6 bg-gray-50 dark:bg-gray-800 h-64 flex flex-col items-center justify-between rounded-lg shadow-sm">
            <div className="flex justify-center mb-2">
              <img
                src={getProfilePictureUrl(teacher.profilePicture)}
                alt={`${teacher.firstName} ${teacher.lastName}`}
                className="w-24 h-24 rounded-full object-cover shadow-sm"
              />
            </div>
            <h5 className="text-lg font-bold text-gray-900 dark:text-white text-center">
              {teacher.firstName} {teacher.lastName}
            </h5>
          </div>

          {/* Personal Info */}
          <div className="md:col-span-3 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm h-auto">
            <div className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-[300px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h5 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Personal Info</h5>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">First Name:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.firstName}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Last Name:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.lastName}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Address:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.address}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Marital Status:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.maritalStatus}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">NRC:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.nrc}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">TS Number:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.tsNo}</span></li>
                </ul>
              </div>

              <div className="flex-1 min-w-[300px] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h5 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Contact & School Info</h5>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Email:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.email}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Specialization:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.subjectSpecialization}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Current Position:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.currentPosition}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">School Name:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.currentSchool?.name || "N/A"}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">School Type:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.currentSchoolType}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">District:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.currentSchool?.district}</span></li>
                  <li className="py-2 flex justify-between"><span className="text-gray-500 dark:text-gray-400">Province:</span><span className="font-medium text-gray-900 dark:text-white">{teacher.currentSchool?.province}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Files + Experience */}
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

          {/* Experience */}
          <div className="md:col-span-3 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm h-auto">
            <h5 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <HiClipboardList className={iconColor} /> Experience
            </h5>
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeacherViewLayout;
