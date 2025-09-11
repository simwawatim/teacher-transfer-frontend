import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const HomeGraph = () => {
  const data = [
    { month: "Jan", Pending: 10, Approved: 25, Rejected: 5 },
    { month: "Feb", Pending: 15, Approved: 20, Rejected: 7 },
    { month: "Mar", Pending: 8, Approved: 30, Rejected: 3 },
    { month: "Apr", Pending: 12, Approved: 28, Rejected: 6 },
    { month: "May", Pending: 14, Approved: 32, Rejected: 4 },
    { month: "Jun", Pending: 9, Approved: 22, Rejected: 5 },
    { month: "Jul", Pending: 18, Approved: 27, Rejected: 8 },
    { month: "Aug", Pending: 11, Approved: 26, Rejected: 6 },
    { month: "Sep", Pending: 16, Approved: 34, Rejected: 7 },
    { month: "Oct", Pending: 13, Approved: 29, Rejected: 5 },
    { month: "Nov", Pending: 10, Approved: 24, Rejected: 6 },
    { month: "Dec", Pending: 12, Approved: 31, Rejected: 4 },
  ];

  const renderLegendIcon = (value: string) => {
    switch (value) {
      case "Pending":
        return "🕒"; // clock icon
      case "Approved":
        return "✅"; // check mark
      case "Rejected":
        return "❌"; // cross mark
      default:
        return null;
    }
  };

  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex gap-4 justify-center mt-2">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-1 text-white font-semibold">
            <span>{renderLegendIcon(entry.value)}</span>
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-[24rem] p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">
        Teacher Transfers by Month
      </h2>

      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
          />
          <Legend content={renderCustomLegend} />
          <Bar dataKey="Pending" fill="#d4aa1e" />
          <Bar dataKey="Approved" fill="#16a34a" />
          <Bar dataKey="Rejected" fill="#b91c1c" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HomeGraph;
