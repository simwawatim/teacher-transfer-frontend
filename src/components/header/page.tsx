"use client";

import { BellIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/api/base/base"; // your API base URL
import { getCurrentUser } from "@/api/base/jwt"; // your JWT helper

const HeaderPage = () => {
  const defaultImage = "/blank-male.jpg";

  const [unreadCount, setUnreadCount] = useState(0);
  const [profileImage, setProfileImage] = useState<string>(defaultImage);

  useEffect(() => {
    // Dummy unread notifications
    setUnreadCount(3);

    // Fetch logged-in user's profile picture
    const fetchProfilePicture = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/teachers/me/profile-picture`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile picture");

        const data = await res.json();
        if (data.profilePicture) {
      
          const updatedUrl =   data.profilePicture.replace(':3000', ':4000');
          setProfileImage(updatedUrl);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfilePicture();
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
          <Link
            href="/notifications"
            className="relative p-2 rounded-full hover:bg-gray-700"
          >
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
