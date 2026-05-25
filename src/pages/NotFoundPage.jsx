import { Link } from 'react-router-dom';
import { ROUTES } from '@routes/routePaths.js';

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <span className="eyebrow">Error 404</span>
      <h1>Pagina no encontrada</h1>
      <p>La ruta que intentas abrir no existe o fue movida.</p>
      <Link className="button button--primary" to={ROUTES.HOME}>
        Volver al inicio
      </Link>
    </main>
  );
}
