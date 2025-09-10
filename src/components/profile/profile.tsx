import { useState } from "react";

// ✅ Step 1: Extend Teacher type with image field
type Teacher = {
  name: string;
  nrc: string;
  tsNo: string;
  school: string;
  position: string;
  subject: string;
  experience: string;
  email: string;
  phone: string;
  bio: string;
  education: string;
  rating: number;
  reviews: number;
  image: string; // profile picture path/URL
};

export default function ProfileComp() {
  const [teacher, setTeacher] = useState<Teacher>({
    name: "John Mwansa",
    nrc: "123456111",
    tsNo: "TS00123",
    school: "Kyawama Secondary",
    position: "Subject Teacher",
    subject: "Mathematics",
    experience: "5 yrs",
    email: "john.mwansa@kyawama.edu",
    phone: "+260 123 456 789",
    bio: "Dedicated mathematics teacher with 5 years of experience in secondary education. Specialized in algebra and calculus. Committed to student success and innovative teaching methods.",
    education: "Bachelor of Education, University of Zambia",
    rating: 4.8,
    reviews: 42,
    image: "../blank-male.jpg", // default picture
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Teacher>(teacher);

  // ✅ Step 2: Handle text/number field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" || name === "reviews" ? Number(value) : value,
    }));
  };

  // ✅ Step 3: Handle profile picture upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSave = () => {
    setTeacher(formData);
    setIsEditing(false);
  };

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          {/* Profile Image */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <div className="relative">
              <img
                className="w-full rounded-lg shadow-lg dark:shadow-gray-800"
                src={isEditing ? formData.image : teacher.image}
                alt={`${teacher.name}, ${teacher.position}`}
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 block text-sm text-gray-500 dark:text-gray-400"
                />
              )}
              <div className="absolute bottom-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                Available
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-6 sm:mt-8 lg:mt-0">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="text-2xl font-bold w-full mb-2 px-2 py-1 border rounded"
                />
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="text-lg w-full mb-4 px-2 py-1 border rounded"
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                  {teacher.name}
                </h1>
                <p className="text-lg text-primary-700 dark:text-primary-400 mt-1">
                  {teacher.position}
                </p>
              </>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {(["nrc", "tsNo", "subject", "education"] as (keyof Teacher)[]).map(
                (field) => (
                  <div
                    key={field}
                    className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
                  >
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {field.toUpperCase()}
                    </p>
                    {isEditing ? (
                      <input
                        type="text"
                        name={field}
                        value={formData[field] as string}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white font-medium">
                        {teacher[field]}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                About
              </h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                  rows={4}
                />
              ) : (
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {teacher.bio}
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div className="mt-6 p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>
              {(["phone", "email", "school"] as (keyof Teacher)[]).map(
                (field) => (
                  <div key={field} className="mb-3">
                    {isEditing ? (
                      <input
                        type="text"
                        name={field}
                        value={formData[field] as string}
                        onChange={handleChange}
                        className="w-full px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                      />
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400">
                        {teacher[field]}
                      </span>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
