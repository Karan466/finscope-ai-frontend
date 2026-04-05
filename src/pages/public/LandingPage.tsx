import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, BarChart3, Brain } from "lucide-react";
import ThemeToggle from "../../components/common/ThemeToggle";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="flex justify-end mb-8">
          <ThemeToggle />
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <p className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm border border-primary/20 mb-6">
            AI-Powered Finance Monitoring Platform
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Smarter Financial Oversight with{" "}
            <span className="text-primary">FinScope AI</span>
          </h1>

          <p className="mt-6 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Detect anomalies, manage approvals, track financial records, and
            gain powerful insights — all from one intelligent dashboard.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/login"
              className="px-6 py-3 rounded-2xl bg-primary hover:opacity-90 transition text-white font-semibold flex items-center gap-2 shadow-glow"
            >
              Launch Dashboard <ArrowRight size={18} />
            </Link>

            <button className="px-6 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 transition font-semibold">
              Explore Features
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
            <ShieldCheck className="text-primary mb-4" size={30} />
            <h3 className="text-xl font-semibold mb-2">Approval Workflow</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Automate and control high-value financial approvals securely.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
            <BarChart3 className="text-primary mb-4" size={30} />
            <h3 className="text-xl font-semibold mb-2">Dashboard Insights</h3>
            <p className="text-slate-500 dark:text-slate-400">
              View income, expenses, trends, and key finance KPIs in real time.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
            <Brain className="text-primary mb-4" size={30} />
            <h3 className="text-xl font-semibold mb-2">AI Anomaly Detection</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Instantly flag unusual transactions and suspicious spending.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;