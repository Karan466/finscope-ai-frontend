import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const RecordsPage = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await API.get("/records");
        setRecords(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <p className="text-slate-400">Loading records...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Financial Records</h2>

        <button
          onClick={() => navigate("/dashboard/add-record")}
          className="px-5 py-2 rounded-xl bg-primary text-white hover:opacity-90 transition"
        >
          + Add Record
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg">
        <table className="w-full border border-slate-800 rounded-xl overflow-hidden">
       <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
             <tr
  key={record.id}
  className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
>
                <td className="p-3 font-semibold">₹{record.amount}</td>

                <td className="p-3">
                  <span
                    className={
                      record.type === "INCOME"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {record.type}
                  </span>
                </td>

                <td className="p-3">{record.category}</td>

                <td className="p-3">
                  {new Date(record.date).toLocaleDateString()}
                </td>

                <td className="p-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-slate-800">
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecordsPage;