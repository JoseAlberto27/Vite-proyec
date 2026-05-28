import { MonitorSmartphone, Radio, WandSparkles, Zap } from 'lucide-react';
import { ScrollReveal } from '@components/animations/ScrollReveal.jsx';

const steps = [
  {
    title: 'Realtime messaging',
    description: 'Messages arrive with calm motion, clear delivery rhythm and persistent context.',
    icon: Radio
  },
  {
    title: 'Responsive flow',
    description: 'The product behaves like a mobile app first and a desktop workspace second.',
    icon: MonitorSmartphone
  },
  {
    title: 'Modern interface',
    description: 'Layered surfaces, focused copy and premium contrast keep attention on the chat.',
    icon: WandSparkles
  },
  {
    title: 'Smooth interactions',
    description: 'Hover, focus, reveal and composer interactions use transform and opacity only.',
    icon: Zap
  }
];

export function ExperienceSection() {
  return (
    <section className="experience-section section-shell" id="experience">
      <ScrollReveal className="section-heading section-heading--center">
        <p className="section-kicker">Experience system</p>
        <h2>A product rhythm built from small, intentional states.</h2>
      </ScrollReveal>

      <div className="timeline">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <ScrollReveal delay={index * 90} key={step.title}>
              <article className="timeline-item">
                <span className="timeline-item__index">0{index + 1}</span>
                <span className="timeline-item__icon">
                  <Icon size={20} />
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
