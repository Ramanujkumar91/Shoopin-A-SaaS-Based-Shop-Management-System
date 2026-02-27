import RegisterShop from "./pages/public/RegisterShop";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/public/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Pricing from "./pages/dashboard/Pricing";
import Products from "./pages/dashboard/Products";
import Billing from "./pages/dashboard/Billing";
import Customers from "./pages/dashboard/Customers";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleGuard from "./routes/RoleGuard";
import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterShop />} />

        {/* ================= DASHBOARD HOME ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* ================= OWNER ONLY ================= */}
        <Route
          path="/dashboard/pricing"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["OWNER"]}>
                <DashboardLayout>
                  <Pricing />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/products"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["OWNER"]}>
                <DashboardLayout>
                  <Products />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/customers"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["OWNER"]}>
                <DashboardLayout>
                  <Customers />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/reports"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["OWNER"]}>
                <DashboardLayout>
                  <Reports />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["OWNER"]}>
                <DashboardLayout>
                  <Settings />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />

        {/* ================= OWNER + STAFF ================= */}
        <Route
          path="/dashboard/billing"
          element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["OWNER", "STAFF"]}>
                <DashboardLayout>
                  <Billing />
                </DashboardLayout>
              </RoleGuard>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;