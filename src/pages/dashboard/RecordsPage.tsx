import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const categories = [
  "ALL",
  "Salary",
  "Travel",
  "Rent",
  "Vendor Payment",
  "Equipment Purchase",
  "Construction",
  "Food",
  "Utilities",
];

const RecordsPage = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("ALL");

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/records?category=${category}`);
      setRecords(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [category]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Financial Records</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            View and filter your finance records.
          </p>
        </div>

        <div>
          <label className="block text-sm text-slate-500 dark:text-slate-400 mb-2">
            Category Filter
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <p className="p-6 text-slate-500 dark:text-slate-400">Loading records...</p>
        ) : records.length === 0 ? (
          <p className="p-6 text-slate-500 dark:text-slate-400">No records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm">
                <tr>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr
                    key={record.id}
                    className="border-t border-slate-200 dark:border-slate-800"
                  >
                    <td className="px-6 py-4 font-semibold">₹{record.amount}</td>
                    <td className="px-6 py-4">{record.type}</td>
                    <td className="px-6 py-4">{record.category}</td>
                    <td className="px-6 py-4">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{record.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordsPage;