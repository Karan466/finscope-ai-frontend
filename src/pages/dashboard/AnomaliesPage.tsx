import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const severityColors: Record<string, string> = {
  LOW: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  MEDIUM: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  HIGH: "bg-red-500/20 text-red-300 border-red-500/30",
};

const AnomaliesPage = () => {
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnomalies = async () => {
    try {
      const res = await API.get("/anomalies");
      setAnomalies(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch anomalies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnomalies();
  }, []);

  if (loading) {
    return <p className="text-slate-400">Loading anomalies...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Anomaly Detection</h2>

      <div className="space-y-4">
        {anomalies.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-400">
            No anomalies detected.
          </div>
        ) : (
          anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold">
                    ₹{anomaly.record?.amount || 0} -{" "}
                    {anomaly.record?.category || "Unknown"}
                  </p>

                  <p className="text-slate-400 text-sm mt-1">
                    Type: {anomaly.record?.type || "Unknown"}
                  </p>

                  <p className="text-slate-300 mt-3">
                    Reason: {anomaly.reason}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm border ${
                      severityColors[anomaly.severity] ||
                      "bg-slate-800 text-slate-300 border-slate-700"
                    }`}
                  >
                    {anomaly.severity}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnomaliesPage;