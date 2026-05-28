import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@routes/routePaths.js';

const navItems = [
  { label: 'Preview', href: '#preview' },
  { label: 'Features', href: '#features' },
  { label: 'Experience', href: '#experience' }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 18);

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });

    return () => window.removeEventListener('scroll', updateNavbar);
  }, []);

  return (
    <header className={`landing-nav ${isScrolled ? 'is-scrolled' : ''}`}>
      <Link className="brand-lockup" to={ROUTES.HOME} aria-label="Vite Proyec home">
        <span className="brand-mark">
          <MessageCircle size={18} />
        </span>
        <span>Vite Proyec</span>
      </Link>

      <nav className="landing-nav__links" aria-label="Landing sections">
        {navItems.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <Link className="nav-cta" to={ROUTES.CHAT}>
        Open Chat
      </Link>
    </header>
  );
}
