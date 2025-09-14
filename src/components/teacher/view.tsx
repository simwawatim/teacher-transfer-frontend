import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getTeacherById, Teacher } from "../../api/teachers/teachers";

export default function Teacherview() {
  const router = useRouter();
  const { id } = router.query;

  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const teacherId = id ? (id as string) : "3"; // default ID
    console.log("Fetching teacher with ID:", teacherId);

    const fetchTeacher = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getTeacherById(teacherId);

        if (!data) {
          console.error("Teacher not found for ID:", teacherId);
          setError(`Teacher ID ${teacherId} not found.`);
        } else {
          setTeacher({
            ...data,
            experience: JSON.parse(data.experience as unknown as string), // parse experience
          });
        }
      } catch (err) {
        console.error("Error fetching teacher with ID:", teacherId, err);
        setError("Failed to load teacher data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading teacher data...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!teacher) return <p className="text-center py-10">Teacher not found.</p>;

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Left: Profile Image */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <div className="relative">
              <img
                className="w-full rounded-lg shadow-lg dark:shadow-gray-800"
                src="../blank-male.jpg"
                alt={`${teacher.firstName} ${teacher.lastName}`}
              />
              <div className="absolute bottom-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                Available
              </div>
            </div>
          </div>

          {/* Right: Teacher Details */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              {teacher.firstName} {teacher.lastName}
            </h1>
            <p className="text-lg text-primary-700 dark:text-primary-400 mt-1">
              {teacher.currentPosition}
            </p>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">NRC Number</p>
                <p className="text-gray-900 dark:text-white font-medium">{teacher.nrc}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">TS Number</p>
                <p className="text-gray-900 dark:text-white font-medium">{teacher.tsNo}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">Subject</p>
                <p className="text-gray-900 dark:text-white font-medium">{teacher.subjectSpecialization}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">Education</p>
                <p className="text-gray-900 dark:text-white font-medium">{teacher.academicQualifications}</p>
              </div>
            </div>

            {/* Experience */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Experience</h2>
              <ul className="list-disc list-inside text-gray-500 dark:text-gray-400">
                {Array.isArray(teacher.experience) &&
                  teacher.experience.map((exp: any, index: number) => (
                    <li key={index}>
                      {exp.school} - {exp.years} {exp.years > 1 ? "years" : "year"}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <p>Email: {teacher.email}</p>
                <p>Address: {teacher.address}</p>
                <p>Marital Status: {teacher.maritalStatus}</p>
                <p>Medical Certificate: {teacher.medicalCertificate}</p>
                <p>Current School: {teacher.currentSchoolName}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Professional Qualifications</h2>
              <p className="text-gray-500 dark:text-gray-400">{teacher.professionalQualifications}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
