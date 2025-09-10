const HeaderPage = () => {
  const defaultImage =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  return (
    <>
      <header className="flex shadow-lg py-4 px-4 sm:px-10 bg-gray-900 min-h-[70px] tracking-wide relative z-50">
        <div className="flex items-center justify-between w-full">
          {/* Left Side: Logo + Title */}
          <a href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <img
                className="h-12 w-auto object-contain rounded-md shadow-sm"
                src="/logo.png"
                alt="Company Logo"
              />
              <span className="ml-2 text-xl font-semibold text-white">
                Dashboard
              </span>
            </div>
          </a>

          {/* Right Side: Profile */}
          <div className="flex items-center space-x-4">
            <a href="/profile">
              <img
                src={defaultImage}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-gray-600 shadow-sm cursor-pointer"
              />
            </a>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderPage;
