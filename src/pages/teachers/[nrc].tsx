import HeaderPage from "@/components/header/page";
import Teacherview from "../../components/teacher/view"
import Sidebar from "@/components/sidenav/page";

export default function TeacherViewPage() {
  return (
    <>
    <div className="flex flex-col h-screen">
            {/* Top Header */}
            <HeaderPage />

            {/* Main content area: sidebar + content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 border-r  overflow-y-auto">
                    <Sidebar />
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Teacherview/>
                </main>
            </div>
        </div>  
    </>
  );

}

