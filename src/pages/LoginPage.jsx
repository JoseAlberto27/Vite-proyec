import { useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/Button.jsx';
import { useAuth } from '@hooks/useAuth.js';
import { useToast } from '@hooks/useToast.js';
import { ROUTES } from '@routes/routePaths.js';
import { getErrorMessage } from '@utils/errorHandler.js';

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: 'demo@app.com',
    password: '123456'
  });
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      await login(formData);
      showToast({ title: 'Bienvenido', message: 'Sesion iniciada correctamente.', variant: 'success' });
      navigate(redirectTo, { replace: true });
    } catch (loginError) {
      const message = getErrorMessage(loginError);
      setError(message);
      showToast({ title: 'No se pudo iniciar sesion', message, variant: 'error' });
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-card__icon">
          <LockKeyhole size={22} />
        </div>
        <h1>INICIAR SESION</h1>
        <p>Accede al dashboard con la cuenta demo o conecta tu API real.</p>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              autoComplete="email"
              name="email"
              onChange={handleChange}
              placeholder="correo@empresa.com"
              type="email"
              value={formData.email}
            />
          </label>

          <label>
            Contrasena
            <input
              autoComplete="current-password"
              name="password"
              onChange={handleChange}
              placeholder="Tu contrasena"
              type="password"
              value={formData.password}
            />
          </label>

          {error ? <p className="form-error">{error}</p> : null}

          <Button isLoading={isLoading} type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </section>
  );
}
