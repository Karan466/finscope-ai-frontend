import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const AuditLogsPage = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const res = await API.get("/audit");
      setLogs(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return <p className="text-slate-400">Loading audit logs...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Audit Logs</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-slate-800 rounded-xl overflow-hidden">
          <thead className="bg-slate-900">
            <tr>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Entity</th>
              <th className="p-3 text-left">Entity ID</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-slate-400">
                  No audit logs found.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="border-t border-slate-800">
                  <td className="p-3">
                    {log.user?.name || "Unknown User"}
                  </td>
                  <td className="p-3 font-medium">{log.action}</td>
                  <td className="p-3">{log.entityType}</td>
                  <td className="p-3 text-slate-400">{log.entityId}</td>
                  <td className="p-3">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogsPage;