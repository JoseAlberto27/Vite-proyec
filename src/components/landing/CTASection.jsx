import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@components/animations/ScrollReveal.jsx';
import { ROUTES } from '@routes/routePaths.js';

export function CTASection() {
  return (
    <section className="cta-section section-shell">
      <ScrollReveal className="cta-panel">
        <div className="cta-panel__glow" />
        <p className="section-kicker">Ready for the next build</p>
        <h2>Turn this visual foundation into the chat product.</h2>
        <p>
          The landing now has a premium identity. The next layer is Firebase
          Auth, realtime conversations, profiles and media messaging.
        </p>
        <Link className="button-primary" to={ROUTES.CHAT}>
          Open Chat
          <ArrowRight size={18} />
        </Link>
      </ScrollReveal>
    </section>
  );
}
