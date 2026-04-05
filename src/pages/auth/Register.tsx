import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../services/api";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "VIEWER",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      toast.success("Registration successful");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Create Account 🚀</h2>
        <p className="text-slate-400 mb-8">
          Join FinScope AI and start monitoring finance smarter.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-slate-300">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:border-primary"
            >
              <option value="VIEWER">Viewer</option>
              <option value="ANALYST">Analyst</option>
              <option value="APPROVER">Approver</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-2xl bg-primary hover:opacity-90 transition font-semibold shadow-glow"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-slate-400 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;