import { useEffect, useState } from "react";

interface Stat {
  title: string;
  value: number;
  description: string;
  icon: string;
  link: string;
}

const HomeStats = () => {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats([
          {
            title: "Teachers",
            value: data.totals.totalTeachers,
            description: "Total active teachers",
            icon: "👩‍🏫",
            link: "/teachers",
          },
          {
            title: "Schools",
            value: data.totals.totalSchools,
            description: "Schools in the system",
            icon: "🏫",
            link: "/schools",
          },
          {
            title: "Pending Transfers",
            value: data.totals.pendingTransfers,
            description: "Requests waiting for approval",
            icon: "📨",
            link: "/transfer",
          },
        ]);
      });
  }, []);

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
