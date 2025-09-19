"use client";

import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/api/base/base";
import NotificationComp from "../../components/notifications/comp";

const HeaderPage = () => {
  const defaultImage = "/blank-male.jpg";

  const [unreadCount, setUnreadCount] = useState(0);
  const [profileImage, setProfileImage] = useState<string>(defaultImage);
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3); // how many to show
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setUnreadCount(5); // simulate unread
    const fetchProfilePicture = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/teachers/me/profile-picture`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch profile picture");
        const data = await res.json();
        if (data.profilePicture) {
          const updatedUrl = data.profilePicture.replace(":3000", ":4000");
          setProfileImage(updatedUrl);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfilePicture();
  }, []);

  // close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
          <span className="ml-2 text-xl font-semibold text-white">Dashboard</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          {/* Notification Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="relative p-2 rounded-full hover:bg-gray-700"
            >
              <BellIcon className="h-6 w-6 text-white" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-96 bg-gray-900 rounded-xl shadow-lg z-50">
                <div className="p-3 font-semibold text-white-700 border-b">
                  Notifications
                </div>

                {/* Scrollable notification list */}
                <div className="max-h-80 overflow-y-auto">
                  <NotificationComp limit={visibleCount} />
                </div>

                {/* See More button */}
                <div className="p-3 border-t flex justify-center">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="px-4 py-1.5 text-sm font-medium text-white-600 bg-indigo-600 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    See more
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings Icon */}
          <Link href="/settings" className="p-2 rounded-full hover:bg-gray-700">
            <Cog6ToothIcon className="h-6 w-6 text-white" />
          </Link>

          {/* Profile */}
          <Link href="/profile">
            <img
              src={profileImage}
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
