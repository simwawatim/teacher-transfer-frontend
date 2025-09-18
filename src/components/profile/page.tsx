import HeaderPage from "../header/page";
import Sidebar from "../sidenav/page";
import TeacherProfilePage from "./profile";

const ProfilePage = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top Header */}
      <HeaderPage />

      {/* Main content area: sidebar + content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Pass the teacherId prop */}
          <TeacherProfilePage teacherId={10} />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
