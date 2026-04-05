import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const ApprovalsPage = () => {
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovals = async () => {
    try {
      const res = await API.get("/approvals");
      setApprovals(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch approvals");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await API.patch(`/approvals/${id}/approve`);
      toast.success("Approved successfully");
      fetchApprovals();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Approve failed");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await API.patch(`/approvals/${id}/reject`);
      toast.success("Rejected successfully");
      fetchApprovals();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Reject failed");
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  if (loading) {
    return <p className="text-slate-400">Loading approvals...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Approvals</h2>

      <div className="space-y-4">
        {approvals.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-400">
            No approvals found.
          </div>
        ) : (
          approvals.map((approval) => (
            <div
              key={approval.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <p className="text-lg font-semibold">
                  ₹{approval.record?.amount || 0} -{" "}
                  {approval.record?.category || "Unknown"}
                </p>

                <p className="text-slate-400 text-sm mt-1">
                  Requested by:{" "}
                  {approval.record?.createdBy?.name || "Unknown"}
                </p>

                <p className="text-slate-500 text-sm mt-1">
                  Status: {approval.decision}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(approval.id)}
                  className="px-5 py-2 rounded-2xl bg-green-600 hover:bg-green-500 transition text-white font-medium"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(approval.id)}
                  className="px-5 py-2 rounded-2xl bg-red-600 hover:bg-red-500 transition text-white font-medium"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApprovalsPage;