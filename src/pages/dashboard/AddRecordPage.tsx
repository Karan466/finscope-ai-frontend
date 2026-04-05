import { useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddRecordPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    amount: "",
    type: "EXPENSE",
    category: "",
    date: "",
    note: "",
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

      await API.post("/records", {
        ...form,
        amount: Number(form.amount),
      });

      toast.success("Record created successfully");
      navigate("/dashboard/records");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to create record");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Add Financial Record</h2>

      <form
        onSubmit={handleSubmit}
       className="space-y-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl"
      >
        <div>
          <label className="block mb-2 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
          >
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Travel, Salary, Rent"
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Note</label>
          <input
            type="text"
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Optional note"
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
        >
          {loading ? "Creating..." : "Create Record"}
        </button>
      </form>
    </div>
  );
};

export default AddRecordPage;