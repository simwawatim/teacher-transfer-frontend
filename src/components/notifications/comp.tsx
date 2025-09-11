import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "@heroicons/react/24/outline";

interface Notification {
  id: number;
  type: "pending" | "approved" | "rejected";
  user: string; // who did the action
  date: string;
}

const NotificationComp = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Example: fetch notifications from backend
  useEffect(() => {
    const dummyData: Notification[] = [
      { id: 1, type: "pending", user: "John Mwansa", date: "2025-09-11" },
      { id: 2, type: "approved", user: "Admin", date: "2025-09-10" },
      { id: 3, type: "rejected", user: "Principal", date: "2025-09-09" },
    ];
    setNotifications(dummyData);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "pending":
        return <ClockIcon className="h-6 w-6 text-yellow-400" />;
      case "approved":
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case "rejected":
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getMessage = (notif: Notification) => {
    switch (notif.type) {
      case "pending":
        return `${notif.user} has submitted a transfer request.`;
      case "approved":
        return `${notif.user} has approved your transfer request.`;
      case "rejected":
        return `${notif.user} has rejected your transfer request.`;
      default:
        return "";
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md min-h-[60vh]">
      <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-300">No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className="flex items-center p-4 bg-gray-800 rounded-lg shadow hover:bg-gray-700 transition"
            >
              <div className="mr-4">{getIcon(notif.type)}</div>
              <div>
                <p className="text-white">{getMessage(notif)}</p>
                <p className="text-gray-400 text-sm">{notif.date}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationComp;
