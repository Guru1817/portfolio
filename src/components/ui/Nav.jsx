import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { info } from '@/data/info';

const links = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
        <button
          onClick={() => handleClick('hero')}
          className="font-display text-xl tracking-tight text-gradient-cool"
        >
          GN.
        </button>

        <div
          className={`hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 transition-all ${
            scrolled ? 'glass' : ''
          }`}
        >
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                active === link.id ? 'text-white' : 'text-ink-muted hover:text-white'
              }`}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/8"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(34,211,238,0.18), rgba(124,58,237,0.18))',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </button>
          ))}
        </div>

        <a
          href={info.resume}
          download
          className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium backdrop-blur transition hover:border-aurora-cyan/60 hover:bg-aurora-cyan/10"
        >
          Resume ↓
        </a>
      </div>
    </motion.nav>
  );
}
