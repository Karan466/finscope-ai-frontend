import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardLayout from "../components/layout/DashboardLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import RecordsPage from "../pages/dashboard/RecordsPage";
import ApprovalsPage from "../pages/dashboard/ApprovalsPage";
import AnomaliesPage from "../pages/dashboard/AnomaliesPage";
import AuditLogsPage from "../pages/dashboard/AuditLogsPage";
import UsersPage from "../pages/dashboard/UsersPage";
import AddRecordPage from "../pages/dashboard/AddRecordPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="records" element={<RecordsPage />} />
          <Route path="add-record" element={<AddRecordPage />} />
          <Route path="approvals" element={<ApprovalsPage />} />
          <Route path="anomalies" element={<AnomaliesPage />} />
          <Route path="audit" element={<AuditLogsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;