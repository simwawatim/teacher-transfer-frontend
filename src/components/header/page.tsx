const HeaderPage = () => {

      const defaultImage =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";
    return (
        <>
            <header className="flex shadow-lg py-4 px-4 sm:px-10 bg-gray-900 min-h-[70px] tracking-wide relative z-50">
                <div className="flex items-center justify-between w-full">
                    <a href="/" className="flex items-center space-x-2">

                        <div className="flex items-center">
                        <img
                            className="h-12 w-auto object-contain rounded-md shadow-sm"
                            src="/logo.png"
                            alt="Company Logo"
                            />
                        <span className="ml-2 text-xl font-semibold">Dashboard</span>
                        </div>
                    </a>
                </div>
            </header>
        </>
    )
}

export default HeaderPage