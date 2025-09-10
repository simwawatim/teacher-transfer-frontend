const Sidebar = () => {
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
                    {/* Collapse button can be added here */}
                    </div>
                </div>

                <div className="overflow-auto py-6 h-full mt-4">
                    <ul className="space-y-2">
                    <li>
                        <a
                        href="/home"
                        className="text-white-800 font-medium hover:text-white-900 hover:bg-indigo-500 text-[15px] flex items-center rounded px-4 py-2 transition-all"
                        >
                        <span>Dashboard</span>
                        </a>
                    </li>
                        <li>
                        <a
                            href="/teachers"
                            className="text-white-800 font-medium hover:text-white-900 hover:bg-indigo-500 text-[15px] flex items-center rounded px-4 py-2 transition-all"
                        >
                            <span>Teachers</span>
                        </a>
                        </li>
                    

                        <>
                        <li>
                            <a
                            href="/transfer"
                            className="text-white-800 font-medium hover:text-white-900 hover:bg-indigo-500 text-[15px] flex items-center rounded px-4 py-2 transition-all"
                            >
                            <span>Transfers</span>
                            </a>
                        </li>
                        </>


                        <>
                        <li>
                            <a
                            href="/schools"
                            className="text-white-800 font-medium hover:text-white-900 hover:bg-indigo-500 text-[15px] flex items-center rounded px-4 py-2 transition-all"
                            >
                            <span>Schools</span>
                            </a>
                        </li>
                        
                        </>
                

                    <li>
                        <a
                        href="/profile"
                        className="text-white-800 font-medium hover:text-white-900 hover:bg-indigo-500 text-[15px] flex items-center rounded px-4 py-2 transition-all"
                        >
                        <span>Profile</span>
                        </a>
                    </li>

                    <li>
                        <a
                        href="/"
            
                        className="text-white-800 font-medium hover:text-white-900 hover:bg-indigo-500 text-[15px] flex items-center rounded px-4 py-2 transition-all"
                        >
                        <span>Logout</span>
                        </a>
                    </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Sidebar