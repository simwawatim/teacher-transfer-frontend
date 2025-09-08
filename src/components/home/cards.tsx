const HomeCards = () => {
  const cards = [
    {
      title: "Teachers",
      description: "Manage teacher information, assignments, and profiles.",
      link: "#",
    },
    {
      title: "Schools",
      description: "View and manage school details, staff, and capacity.",
      link: "#",
    },
    {
      title: "Pending Transfers",
      description: "Track and approve pending teacher transfer requests.",
      link: "#",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-6 bg-gray-900  border border-gray-200 rounded-lg shadow-sm 
                     dark:bg-gray-900 dark:border-gray-700"
        >
          <a href={card.link}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {card.title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {card.description}
          </p>
          <a
            href={card.link}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center 
                       text-white bg-indigo-500 rounded-lg hover:bg-indigo-500
                       focus:ring-4 focus:outline-none focus:bg-indigo-500
                       dark:bg-indigo-500 dark:hover:bg-indigo-500 dark:focus:ring-blue-800"
          >
            Open
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
};

export default HomeCards;
