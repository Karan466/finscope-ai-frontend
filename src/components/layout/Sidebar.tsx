import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  AlertTriangle,
  Users,
  ShieldCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Records", path: "/dashboard/records", icon: FileText },
  { name: "Approvals", path: "/dashboard/approvals", icon: CheckCircle },
  { name: "Anomalies", path: "/dashboard/anomalies", icon: AlertTriangle },
  { name: "Users", path: "/dashboard/users", icon: Users },
  { name: "Audit Logs", path: "/dashboard/audit", icon: ShieldCheck },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          FinScope <span className="text-primary">AI</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Smart Finance Intelligence
        </p>
      </div>

      <nav className="space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200",
                active
                  ? "bg-primary text-white shadow-glow"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;