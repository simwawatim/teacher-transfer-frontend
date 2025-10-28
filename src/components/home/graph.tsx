import { useEffect, useState } from "react";
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
import { fetchStats } from "../../api/stat/stats";
import router from "next/router";

const HomeGraph = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    fetchStats(token)
      .then((res) => {
        const normalized = res.transferByMonth.map((month: any) => ({
          month: month.month.toLowerCase(),
          pending: month.Pending || month.pending || 0,
          approved: month.Approved || month.approved || 0,
          rejected: month.Rejected || month.rejected || 0,
        }));

        console.log("Data sent to chart:", normalized);
        setData(normalized);
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
      });
  }, []);

  const renderLegendIcon = (value: string) => {
    switch (value) {
      case "pending":
        return "🕒";
      case "approved":
        return "✅";
      case "rejected":
        return "❌";
      default:
        return null;
    }
  };

  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex gap-4 justify-center mt-2">
        {payload.map((entry: any, index: number) => (
          <div
            key={index}
            className="flex items-center gap-1 text-white font-semibold"
          >
            <span>{renderLegendIcon(entry.value)}</span>
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  const allZero = data.every(
    (month) =>
      month.pending === 0 && month.approved === 0 && month.rejected === 0
  );

  return (
    <div className="w-full h-[24rem] p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-white mb-4">
        Teacher Transfers by Month
      </h2>

      {allZero ? (
        <p className="text-white text-center mt-20">
          No transfers data to display
        </p>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }}
            />
            <Legend content={renderCustomLegend} />
            <Bar dataKey="pending" fill="#d4aa1e" />
            <Bar dataKey="approved" fill="#16a34a" />
            <Bar dataKey="rejected" fill="#b91c1c" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HomeGraph;
