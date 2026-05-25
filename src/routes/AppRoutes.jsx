import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@components/common/ProtectedRoute.jsx';
import { AppLayout } from '@components/layout/AppLayout.jsx';
import { DashboardPage } from '@pages/DashboardPage.jsx';
import { HomePage } from '@pages/HomePage.jsx';
import { LoginPage } from '@pages/LoginPage.jsx';
import { NotFoundPage } from '@pages/NotFoundPage.jsx';
import { ROUTES } from './routePaths.js';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
