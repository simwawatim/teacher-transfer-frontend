const HomeStats = () => {
  const stats = [
    {
      title: "Teachers",
      value: 120, // Example: number of teachers
      description: "Total active teachers",
      icon: "👩‍🏫", // optional emoji/icon
      link: "/teachers",
    },
    {
      title: "Schools",
      value: 25,
      description: "Schools in the system",
      icon: "🏫",
      link: "/schools",
    },
    {
      title: "Pending Transfers",
      value: 7,
      description: "Requests waiting for approval",
      icon: "📨",
      link: "/transfer",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <a
          href={stat.link}
          key={index}
          className="flex flex-col justify-between p-6 bg-gray-900 rounded-lg shadow hover:shadow-lg transition duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{stat.icon}</span>
            <h5 className="text-xl font-bold text-white">{stat.title}</h5>
          </div>
          <p className="text-3xl font-extrabold text-indigo-500 mb-2">{stat.value}</p>
          <p className="text-white text-sm">{stat.description}</p>
        </a>
      ))}
    </div>
  );
};

export default HomeStats;
