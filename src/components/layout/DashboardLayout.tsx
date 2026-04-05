import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  AlertTriangle,
  History,
  Users,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../common/ThemeToggle";

const links = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Records", path: "/dashboard/records", icon: FileText },
  { name: "Approvals", path: "/dashboard/approvals", icon: CheckCircle },
  { name: "Anomalies", path: "/dashboard/anomalies", icon: AlertTriangle },
  { name: "Audit Logs", path: "/dashboard/audit", icon: History },
  { name: "Users", path: "/dashboard/users", icon: Users },
];

const DashboardLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 p-6 hidden md:flex flex-col shadow-xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-glow">
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">FinScope AI</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Smart Finance Governance
              </p>
            </div>
          </div>

          <div className="mt-6 bg-slate-100 dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Logged in as
            </p>
            <h3 className="font-semibold text-lg mt-1">{user?.name || "User"}</h3>
            <p className="text-sm text-primary mt-1">{user?.role || "ROLE"}</p>
          </div>
        </div>

        <nav className="space-y-3 flex-1">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/dashboard"}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-glow"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:translate-x-1"
                  }`
                }
              >
                <Icon size={18} />
                <span className="font-medium">{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white transition font-medium shadow-md"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 md:p-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage records, approvals, anomalies and governance from one place.
            </p>
          </div>

          <ThemeToggle />
        </div>

        <div className="animate-fadeIn">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;