import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import { useToast } from '@hooks/useToast.js';

const icons = {
  success: CheckCircle2,
  error: TriangleAlert,
  info: Info
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-stack" aria-live="polite" aria-label="Notificaciones">
      {toasts.map((toast) => {
        const Icon = icons[toast.variant] || Info;

        return (
          <div className={`toast toast--${toast.variant}`} key={toast.id}>
            <Icon size={18} />
            <div>
              <strong>{toast.title}</strong>
              {toast.message ? <p>{toast.message}</p> : null}
            </div>
            <button
              className="toast__close"
              onClick={() => removeToast(toast.id)}
              aria-label="Cerrar notificacion"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
