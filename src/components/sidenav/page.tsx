import { FaTachometerAlt, FaChalkboardTeacher, FaExchangeAlt, FaSchool, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";

const Sidebar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <>
            <nav className="bg-gray-900 h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4">
                <div className="relative">
                    <a href="/">
                        <img
                            src="https://readymadeui.com/readymadeui.svg"
                            alt="logo"
                            className="w-[150px]"
                        />
                    </a>
                    <div className="absolute -right-6 top-1 h-6 w-6 p-[6px] cursor-pointer bg-[#007bff] flex items-center justify-center rounded-full">
                    </div>
                </div>

                <div className="overflow-auto py-6 h-full mt-4">
                    <ul className="space-y-2">
                        <li>
                            <a
                                href="/home"
                                className="text-white font-medium hover:text-white hover:bg-indigo-500 text-[15px] flex items-center gap-3 rounded px-4 py-2 transition-all"
                            >
                                <FaTachometerAlt />
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/teachers"
                                className="text-white font-medium hover:text-white hover:bg-indigo-500 text-[15px] flex items-center gap-3 rounded px-4 py-2 transition-all"
                            >
                                <FaChalkboardTeacher />
                                <span>Teachers</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/transfer"
                                className="text-white font-medium hover:text-white hover:bg-indigo-500 text-[15px] flex items-center gap-3 rounded px-4 py-2 transition-all"
                            >
                                <FaExchangeAlt />
                                <span>Transfers</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/schools"
                                className="text-white font-medium hover:text-white hover:bg-indigo-500 text-[15px] flex items-center gap-3 rounded px-4 py-2 transition-all"
                            >
                                <FaSchool />
                                <span>Schools</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/profile"
                                className="text-white font-medium hover:text-white hover:bg-indigo-500 text-[15px] flex items-center gap-3 rounded px-4 py-2 transition-all"
                            >
                                <FaUser />
                                <span>Profile</span>
                            </a>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left text-white font-medium hover:text-white hover:bg-indigo-500 text-[15px] flex items-center gap-3 rounded px-4 py-2 transition-all"
                            >
                                <FaSignOutAlt />
                                <span>Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Sidebar;
