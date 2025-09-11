import { BellIcon, Cog6ToothIcon} from "@heroicons/react/24/outline";

const HeaderPage = () => {
  const defaultImage =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  return (
    <header className="flex shadow-lg py-4 px-4 sm:px-10 bg-gray-900 min-h-[70px] tracking-wide relative z-50">
      <div className="flex items-center justify-between w-full">
        {/* Left Side: Logo + Title */}
        <a href="/" className="flex items-center space-x-2">
          <img
            className="h-12 w-auto object-contain rounded-md shadow-sm"
            src="/logo.png"
            alt="Company Logo"
          />
          <span className="ml-2 text-xl font-semibold text-white">
            Dashboard
          </span>
        </a>

        {/* Right Side: Icons + Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="relative p-2 rounded-full hover:bg-gray-700">
            <BellIcon className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              3
            </span>
          </button>


          {/* Profile */}
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
  );
};

export default HeaderPage;
