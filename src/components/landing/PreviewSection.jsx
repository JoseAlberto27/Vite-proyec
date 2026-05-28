import { Image, Mic, Send } from 'lucide-react';
import { ScrollReveal } from '@components/animations/ScrollReveal.jsx';

const messages = [
  { type: 'received', text: 'Can we make it feel more like a real product?' },
  { type: 'sent', text: 'Yes. Dark canvas, clear hierarchy, smooth motion.' },
  { type: 'received', text: 'Perfect. Keep the chat preview alive.' }
];

export function PreviewSection() {
  return (
    <section className="preview-section section-shell" id="preview">
      <ScrollReveal className="section-heading">
        <p className="section-kicker">Product preview</p>
        <h2>A chat surface designed before the chat engine arrives.</h2>
        <p>
          The landing introduces the future product with a composed preview:
          presence, media-ready messaging, realtime rhythm and a polished
          mobile-first shape.
        </p>
      </ScrollReveal>

      <ScrollReveal className="preview-stage" delay={100}>
        <div className="floating-note floating-note--one">
          <strong>Realtime</strong>
          <span>Presence and delivery cues</span>
        </div>
        <div className="floating-note floating-note--two">
          <strong>Mobile-ready</strong>
          <span>Touch-first message composer</span>
        </div>

        <div className="chat-mockup">
          <div className="chat-mockup__header">
            <div className="chat-mockup__avatars">
              <span />
              <span />
              <span />
            </div>
            <div>
              <strong>Launch room</strong>
              <small>Active now</small>
            </div>
          </div>

          <div className="chat-mockup__body">
            {messages.map((message, index) => (
              <div
                className={`mock-message mock-message--${message.type}`}
                key={message.text}
                style={{ '--message-delay': `${index * 140}ms` }}
              >
                {message.text}
              </div>
            ))}
            <div className="mock-attachment">
              <Image size={18} />
              <div>
                <strong>landing-preview.mov</strong>
                <small>8.4 MB</small>
              </div>
            </div>
          </div>

          <div className="chat-composer">
            <button aria-label="Record audio">
              <Mic size={17} />
            </button>
            <span>Message Launch room</span>
            <button aria-label="Send message">
              <Send size={17} />
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
