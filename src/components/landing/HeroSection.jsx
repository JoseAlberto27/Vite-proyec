import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '@components/animations/ScrollReveal.jsx';
import { ROUTES } from '@routes/routePaths.js';

export function HeroSection() {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-ambient hero-ambient--one" />
      <div className="hero-ambient hero-ambient--two" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="section-shell hero-section__inner">
        <ScrollReveal className="hero-copy">
          <p className="section-kicker">Realtime messaging for modern teams</p>
          <h1 id="hero-title">
            Messaging that feels instant, cinematic and deeply focused.
          </h1>
          <p className="hero-copy__lead">
            A premium web chat experience for private conversations, profiles,
            presence and persistent threads, built for the next version of your
            product.
          </p>
          <div className="hero-actions">
            <Link className="button-primary" to={ROUTES.CHAT}>
              Open Chat
              <ArrowRight size={18} />
            </Link>
            <a className="button-secondary" href="#preview">
              <Play size={17} />
              Watch preview
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal className="hero-device" delay={120}>
          <div className="device-frame">
            <div className="device-frame__bar">
              <span />
              <span />
              <span />
            </div>
            <div className="device-conversation">
              <div className="device-user">
                <span className="device-avatar" />
                <div>
                  <strong>Product Circle</strong>
                  <small>5 people online</small>
                </div>
              </div>
              <div className="bubble bubble--left">The new flow feels much faster.</div>
              <div className="bubble bubble--right">Shipping the preview tonight.</div>
              <div className="bubble bubble--left bubble--media">
                <span />
                <div>
                  <strong>UI preview.png</strong>
                  <small>Uploaded now</small>
                </div>
              </div>
              <div className="typing-indicator" aria-label="Someone is typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
