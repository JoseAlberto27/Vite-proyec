import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from '@pages/LandingPage.jsx';
import { ROUTES } from './routePaths.js';

const ChatPage = lazy(() =>
  import('@pages/ChatPage.jsx').then((module) => ({ default: module.ChatPage }))
);

export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <main className="chat-loading">
          <span />
          <p>Loading experience...</p>
        </main>
      }
    >
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path={ROUTES.CHAT} element={<ChatPage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Suspense>
  );
}
