import { BellIcon, Cog6ToothIcon} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Link from "next/link"; // if using Next.js

const HeaderPage = () => {
  const defaultImage =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  // Example: unread notifications count
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // fetch unread count from API or set dummy value
    setUnreadCount(3);
  }, []);

  return (
    <header className="flex shadow-lg py-4 px-4 sm:px-10 bg-gray-900 min-h-[70px] tracking-wide relative z-50">
      <div className="flex items-center justify-between w-full">
        {/* Left Side: Logo + Title */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            className="h-12 w-auto object-contain rounded-md shadow-sm"
            src="/logo.png"
            alt="Company Logo"
          />
          <span className="ml-2 text-xl font-semibold text-white">
            Dashboard
          </span>
        </Link>

        {/* Right Side: Icons + Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <Link href="/notifications" className="relative p-2 rounded-full hover:bg-gray-700">
            <BellIcon className="h-6 w-6 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Settings Icon */}
          <Link href="/settings" className="p-2 rounded-full hover:bg-gray-700">
            <Cog6ToothIcon className="h-6 w-6 text-white" />
          </Link>


          {/* Profile */}
          <Link href="/profile">
            <img
              src={defaultImage}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-600 shadow-sm cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
