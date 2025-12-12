import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useAuthStore } from '@stores/authStore';
import Loading from '@components/ui/Loading';
import Layout from './Layout';

// Lazy load pages
const Dashboard = lazy(() => import('@pages/Dashboard'));
const Login = lazy(() => import('@pages/Login'));
const ProjectProgressReport = lazy(() => import('@pages/Reports/ProjectProgress'));
const EquipmentUtilizationReport = lazy(() => import('@pages/Reports/EquipmentUtilization'));
const FuelConsumptionReport = lazy(() => import('@pages/Reports/FuelConsumption'));
const CertificatesReport = lazy(() => import('@pages/Reports/Certificates'));
const QSSummaryReport = lazy(() => import('@pages/Reports/QSSummary'));
const DirectCostsReport = lazy(() => import('@pages/Reports/DirectCosts'));
const ProfitabilityReport = lazy(() => import('@pages/Reports/Profitability'));
const Analytics = lazy(() => import('@pages/Analytics'));
const Timeline = lazy(() => import('@pages/Timeline'));

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Suspense fallback={<Loading fullScreen text="جاري التحميل..." />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />

            {/* Reports Routes */}
            <Route path="reports">
              <Route index element={<Navigate to="/reports/project-progress" replace />} />
              <Route path="project-progress" element={<ProjectProgressReport />} />
              <Route path="equipment-utilization" element={<EquipmentUtilizationReport />} />
              <Route path="fuel-consumption" element={<FuelConsumptionReport />} />
              <Route path="certificates" element={<CertificatesReport />} />
              <Route path="qs-summary" element={<QSSummaryReport />} />
              <Route path="direct-costs" element={<DirectCostsReport />} />
              <Route path="profitability" element={<ProfitabilityReport />} />
            </Route>

            {/* Analytics & Timeline */}
            <Route path="analytics" element={<Analytics />} />
            <Route path="timeline" element={<Timeline />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
