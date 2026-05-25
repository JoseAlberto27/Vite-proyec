import { AppRoutes } from '@routes/AppRoutes.jsx';
import { ToastContainer } from '@components/ui/ToastContainer.jsx';

export default function App() {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  );
}
