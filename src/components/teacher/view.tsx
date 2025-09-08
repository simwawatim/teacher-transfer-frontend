export default function Teacherview() {
  const teacher = {
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
    reviews: 42
  };

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            {/* Teacher profile image */}
            <div className="relative">
              <img 
                className="w-full rounded-lg shadow-lg dark:shadow-gray-800" 
                src="../blank-male.jpg" 
                alt={`${teacher.name}, ${teacher.position}`} 
              />
              {/* Teacher badge/status */}
              <div className="absolute bottom-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                Available
              </div>
            </div>
            
           
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            {/* Teacher name and credentials */}
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              {teacher.name}
            </h1>
            <p className="text-lg text-primary-700 dark:text-primary-400 mt-1">{teacher.position}</p>
            
            {/* Rating and experience */}
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              
              <div className="flex items-center mt-2 sm:mt-0">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">{teacher.experience} experience</span>
              </div>
            </div>

            {/* Teacher details */}
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
                <p className="text-gray-900 dark:text-white font-medium">{teacher.subject}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">Education</p>
                <p className="text-gray-900 dark:text-white font-medium text-sm">{teacher.education}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
             

              <a
                href="#"
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                role="button"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 6h-5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"
                  />
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 6H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4"
                  />
                </svg>
                View Certfication
              </a>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            {/* Bio section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {teacher.bio}
              </p>
            </div>

            {/* Expertise areas */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Algebra</span>
                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Calculus</span>
                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Geometry</span>
                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Statistics</span>
              </div>
            </div>

             {/* Contact information */}
            <div className="mt-6 p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m18.427 14.768 17.543-17.543a1.531 1.531 0 0 0-2.165-2.166L16.261 12.602a1.53 1.53 0 0 0 .435 2.473l4.563 2.277a1.531 1.531 0 0 0 2.166-.435Z"/>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18.284a15.11 15.11 0 0 0 12.317-12.316"/>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">{teacher.phone}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 7.893a1 1 0 0 0 1.414 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">{teacher.email}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a3 3 0 0 1 3 3v5a2 2 0 0 1-2 2h-8M5 8h-2a3 3 0 0 0-3 3v5a2 2 0 0 0 2 2h8"/>
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">{teacher.school}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}