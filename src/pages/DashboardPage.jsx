import { useEffect } from 'react';
import { Activity, CheckCircle2, Clock, Server } from 'lucide-react';
import { Loader } from '@components/ui/Loader.jsx';
import { useAsync } from '@hooks/useAsync.js';
import { dashboardService } from '@services/dashboardService.js';

const stats = [
  { label: 'Disponibilidad', value: '99.9%', icon: Server },
  { label: 'Tareas activas', value: '24', icon: Activity },
  { label: 'Pendientes', value: '8', icon: Clock },
  { label: 'Completadas', value: '128', icon: CheckCircle2 }
];

export function DashboardPage() {
  const { data: posts, error, isLoading, execute } = useAsync(dashboardService.getPosts);

  useEffect(() => {
    execute().catch(() => {});
  }, [execute]);

  return (
    <section className="dashboard-page">
      <div className="page-heading">
        <span className="eyebrow">Panel privado</span>
        <h1>Dashboard</h1>
        <p>Vista inicial para metricas, actividad reciente y datos consumidos por Axios.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article className="stat-card" key={stat.label}>
              <Icon size={20} />
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          );
        })}
      </div>

      <section className="content-panel">
        <div className="content-panel__header">
          <div>
            <h2>Actividad reciente</h2>
            <p>Datos obtenidos desde `VITE_API_BASE_URL`.</p>
          </div>
        </div>

        {isLoading ? <Loader label="Consultando servicio..." /> : null}
        {error ? <p className="form-error">{error}</p> : null}

        <div className="activity-list">
          {posts?.map((post) => (
            <article className="activity-item" key={post.id}>
              <span>#{post.id}</span>
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
