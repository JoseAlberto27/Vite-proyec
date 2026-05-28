import { Bell, Fingerprint, Layers3, MessageSquareText, Sparkles, Smartphone } from 'lucide-react';
import { ScrollReveal } from '@components/animations/ScrollReveal.jsx';

const features = [
  {
    title: 'Realtime threads',
    description: 'Private conversations with persistent message history and instant visual feedback.',
    icon: MessageSquareText
  },
  {
    title: 'Identity built in',
    description: 'Profiles, avatars and future Google authentication ready for a real product.',
    icon: Fingerprint
  },
  {
    title: 'Presence cues',
    description: 'Online states, typing rhythm and notification patterns that do not shout.',
    icon: Bell
  },
  {
    title: 'Responsive by default',
    description: 'A layout language shaped for mobile first, then expanded for desktop focus.',
    icon: Smartphone
  },
  {
    title: 'Premium UI system',
    description: 'Dark depth, restrained glass, soft glow and consistent interaction states.',
    icon: Sparkles
  },
  {
    title: 'Scalable foundation',
    description: 'Componentized sections prepared for Firebase, chat modules and product routes.',
    icon: Layers3
  }
];

export function FeatureSection() {
  return (
    <section className="features-section section-shell" id="features">
      <ScrollReveal className="section-heading">
        <p className="section-kicker">Core capabilities</p>
        <h2>Everything points toward a real messaging product.</h2>
        <p>
          The interface avoids dashboard noise and focuses on the moments that
          make communication feel immediate, elegant and reliable.
        </p>
      </ScrollReveal>

      <div className="feature-grid">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <ScrollReveal delay={index * 70} key={feature.title}>
              <article className="feature-panel">
                <span className="feature-panel__icon">
                  <Icon size={22} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
