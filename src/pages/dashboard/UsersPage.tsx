import { useEffect, useState } from "react";
import API from "../../services/api";
import toast from "react-hot-toast";

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (id: string, role: string) => {
    try {
      await API.patch(`/users/${id}/role`, { role });
      toast.success("Role updated");
      fetchUsers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update role");
    }
  };

  const handleDeactivate = async (id: string) => {
    try {
      await API.patch(`/users/${id}/deactivate`);
      toast.success("User deactivated");
      fetchUsers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to deactivate");
    }
  };

  const handleActivate = async (id: string) => {
    try {
      await API.patch(`/users/${id}/activate`);
      toast.success("User activated");
      fetchUsers();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to activate");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-slate-400">Loading users...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-lg">
        <table className="w-full">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <td className="p-4 font-medium">{user.name}</td>
                <td className="p-4 text-slate-500 dark:text-slate-400">
                  {user.email}
                </td>

                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="APPROVER">APPROVER</option>
                    <option value="ANALYST">ANALYST</option>
                    <option value="VIEWER">VIEWER</option>
                  </select>
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-4">
                  {user.status === "ACTIVE" ? (
                    <button
                      onClick={() => handleDeactivate(user.id)}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivate(user.id)}
                      className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm"
                    >
                      Activate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;