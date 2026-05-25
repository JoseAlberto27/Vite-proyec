import { BarChart3, Home, ShieldCheck } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '@routes/routePaths.js';

const navigationItems = [
  { label: 'Home', path: ROUTES.HOME, icon: Home },
  { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: BarChart3 },
  { label: 'Seguridad', path: ROUTES.LOGIN, icon: ShieldCheck }
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <span className="sidebar__logo">VP</span>
      </div>

      <nav className="sidebar__nav" aria-label="Navegacion lateral">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink key={item.path} to={item.path} className="sidebar__link">
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
