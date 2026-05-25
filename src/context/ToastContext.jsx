import { useCallback, useMemo, useState } from 'react';
import { ToastContext } from './toastContextValue.js';

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((toastId) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId)
    );
  }, []);

  const showToast = useCallback(
    ({ title, message = '', variant = 'info', duration = 3500 }) => {
      const id = window.crypto.randomUUID();
      setToasts((currentToasts) => [
        ...currentToasts,
        { id, title, message, variant }
      ]);

      window.setTimeout(() => removeToast(id), duration);
    },
    [removeToast]
  );

  const value = useMemo(
    () => ({ toasts, showToast, removeToast }),
    [removeToast, showToast, toasts]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
