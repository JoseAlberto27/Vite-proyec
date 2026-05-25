import { LogIn, LogOut, Menu } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth.js';
import { useToast } from '@hooks/useToast.js';
import { ROUTES } from '@routes/routePaths.js';

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast({ title: 'Sesion cerrada', variant: 'success' });
    navigate(ROUTES.HOME);
  };

  return (
    <header className="navbar">
      <Link className="navbar__brand" to={ROUTES.HOME}>
        <span className="navbar__mark">VP</span>
        <span>{import.meta.env.VITE_APP_NAME}</span>
      </Link>

      <nav className="navbar__links" aria-label="Navegacion principal">
        <NavLink to={ROUTES.HOME}>Home</NavLink>
        <NavLink to={ROUTES.DASHBOARD}>Dashboard</NavLink>
      </nav>

      <div className="navbar__actions">
        {isAuthenticated ? (
          <>
            <span className="navbar__user">{user?.name}</span>
            <button className="icon-button" onClick={handleLogout} aria-label="Cerrar sesion">
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <Link className="button button--ghost" to={ROUTES.LOGIN}>
            <LogIn size={17} />
            Ingresar
          </Link>
        )}
        <button className="icon-button navbar__menu" aria-label="Abrir menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
