import { useEffect, useState } from "react";
import API from "../../services/api";
import FinanceBarChart from "../../components/charts/FinanceBarChart";
import MonthlyTrendChart from "../../components/charts/MonthlyTrendChart";
import toast from "react-hot-toast";

const DashboardHome = () => {
  const [stats, setStats] = useState<any>(null);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState("monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      let statsUrl = `/dashboard/stats?type=${filter}`;
      let monthlyUrl = `/dashboard/monthly-summary?type=${filter}`;

      if (filter === "custom" && startDate && endDate) {
        statsUrl = `/dashboard/stats?startDate=${startDate}&endDate=${endDate}`;
        monthlyUrl = `/dashboard/monthly-summary?startDate=${startDate}&endDate=${endDate}`;
      }

      const statsRes = await API.get(statsUrl);
      setStats(statsRes.data.data);

      try {
        const monthlyRes = await API.get(monthlyUrl);

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

  useEffect(() => {
    if (filter === "custom") {
      if (startDate && endDate) {
        fetchDashboard();
      }
    } else {
      fetchDashboard();
    }
  }, [filter, startDate, endDate]);

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
      title: "Net Balance",
      value: `₹${stats.netBalance ?? 0}`,
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
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Monitor financial activity, approvals, anomalies and trends in real time.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("monthly")}
            className={`px-4 py-2 rounded-2xl font-medium transition ${
              filter === "monthly"
                ? "bg-primary text-white shadow-glow"
                : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setFilter("yearly")}
            className={`px-4 py-2 rounded-2xl font-medium transition ${
              filter === "yearly"
                ? "bg-primary text-white shadow-glow"
                : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            }`}
          >
            Yearly
          </button>

          <button
            onClick={() => setFilter("custom")}
            className={`px-4 py-2 rounded-2xl font-medium transition ${
              filter === "custom"
                ? "bg-primary text-white shadow-glow"
                : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {/* Custom date inputs */}
      {filter === "custom" && (
        <div className="flex flex-wrap gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
          <div>
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-500 dark:text-slate-400 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            />
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
          >
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {card.title}
            </p>
            <h3 className="text-3xl font-bold mt-3">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* AI Insight Card */}
      <div className="bg-gradient-to-r from-primary/10 to-indigo-500/10 border border-primary/20 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xl font-bold mb-2">AI Insight</h3>
        <p className="text-slate-600 dark:text-slate-300">
          {stats.totalExpense > stats.totalIncome
            ? "Your expenses are higher than your income in this selected period. Consider reviewing large spending patterns."
            : "Your finances are healthy in this selected period. Income is currently exceeding expenses."}
        </p>
      </div>

      {/* Charts */}
      <div className="grid xl:grid-cols-2 gap-6">
        <FinanceBarChart data={chartSummaryData} />
        <MonthlyTrendChart data={monthlyData} />
      </div>
    </div>
  );
};

export default DashboardHome;