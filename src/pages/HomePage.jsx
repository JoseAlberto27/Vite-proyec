import { ArrowRight, LayoutDashboard, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@routes/routePaths.js';

const capabilities = [
  {
    title: 'Arquitectura modular',
    description: 'Separacion clara entre rutas, paginas, servicios, contexto y UI.',
    icon: LayoutDashboard
  },
  {
    title: 'Base segura',
    description: 'Rutas protegidas, sesion persistente y manejo centralizado de errores.',
    icon: ShieldCheck
  },
  {
    title: 'Lista para crecer',
    description: 'Alias, Axios global, hooks reutilizables y componentes escalables.',
    icon: Sparkles
  }
];

export function HomePage() {
  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero__content">
          <span className="eyebrow">Frontend profesional con React + Vite</span>
          <h1>Una base limpia para construir productos reales.</h1>
          <p>
            Proyecto preparado con routing, autenticacion demo, layout reusable,
            sistema de alertas, cliente HTTP global y estilos responsive.
          </p>
          <div className="hero__actions">
            <Link className="button button--primary" to={ROUTES.DASHBOARD}>
              Ir al dashboard
              <ArrowRight size={18} />
            </Link>
            <Link className="button button--ghost" to={ROUTES.LOGIN}>
              Iniciar sesion
            </Link>
          </div>
        </div>
        <div className="hero__panel" aria-label="Resumen de arquitectura">
          <div className="metric">
            <span>Stack</span>
            <strong>Vite + React</strong>
          </div>
          <div className="metric">
            <span>Rutas</span>
            <strong>Protegidas</strong>
          </div>
          <div className="metric">
            <span>HTTP</span>
            <strong>Axios global</strong>
          </div>
        </div>
      </div>

      <div className="capability-grid">
        {capabilities.map((capability) => {
          const Icon = capability.icon;

          return (
            <article className="capability-card" key={capability.title}>
              <Icon size={22} />
              <h2>{capability.title}</h2>
              <p>{capability.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
