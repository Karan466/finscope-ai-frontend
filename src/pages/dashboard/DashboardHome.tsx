import { useEffect, useState } from "react";
import API from "../../services/api";
import FinanceBarChart from "../../components/charts/FinanceBarChart";
import MonthlyTrendChart from "../../components/charts/MonthlyTrendChart";
import toast from "react-hot-toast";

const DashboardHome = () => {
  const [stats, setStats] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // 1) fetch stats first
        const statsRes = await API.get("/dashboard/stats");
        console.log("Stats Response:", statsRes.data);

        setStats(statsRes.data.data);

        // 2) fetch monthly separately
        try {
          const monthlyRes = await API.get("/dashboard/monthly-summary");
          console.log("Monthly Response:", monthlyRes.data);

          const formattedMonthly = Object.entries(monthlyRes.data.data || {}).map(
            ([month, value]: any) => ({
              month,
              income: value.income,
              expense: value.expense,
            })
          );

          setMonthlyData(formattedMonthly);
        } catch (monthlyError) {
          console.error("Monthly summary failed:", monthlyError);
          setMonthlyData([]);
        }
      } catch (err) {
        console.error("Dashboard stats failed:", err);
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p className="text-slate-400">Loading dashboard...</p>;
  }

  if (!stats) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
        <h2 className="text-2xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Unable to load dashboard stats.
        </p>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Income",
      value: `₹${stats.totalIncome ?? 0}`,
    },
    {
      title: "Total Expense",
      value: `₹${stats.totalExpense ?? 0}`,
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals ?? 0,
    },
    {
      title: "Anomalies",
      value: stats.anomalyCount ?? 0,
    },
  ];

  const chartSummaryData = [
    {
      name: "Finance",
      income: stats.totalIncome ?? 0,
      expense: stats.totalExpense ?? 0,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Monitor financial activity, approvals, and anomalies in real time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
  {cards.map((card) => (
    <div
      key={card.title}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm"
    >
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        {card.title}
      </p>
      <h3 className="text-3xl font-bold mt-3">{card.value}</h3>
    </div>
  ))}
</div>

      <div className="grid xl:grid-cols-2 gap-6">
        <FinanceBarChart data={chartSummaryData} />
        <MonthlyTrendChart data={monthlyData} />
      </div>
    </div>
  );
};

export default DashboardHome;