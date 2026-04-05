import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ThemeToggle from "../../components/common/ThemeToggle";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      const result = res.data.data;

      login(result.accessToken, result.user);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white flex items-center justify-center px-6 transition-colors duration-300">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold mb-2">Welcome Back 👋</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">
          Sign in to continue to FinScope AI
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-primary hover:opacity-90 transition font-semibold text-white shadow-glow"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;