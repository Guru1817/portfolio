import { motion } from 'framer-motion';
import { info } from '@/data/info';
import Reveal from '@/components/ui/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';

const channels = [
  { label: 'Email', value: info.email, href: info.links.email },
  { label: 'GitHub', value: 'Guru1817', href: info.links.github },
  { label: 'LinkedIn', value: 'gurupada-nayak', href: info.links.linkedin },
  { label: 'Phone', value: info.phone, href: `tel:${info.phone.replace(/\s/g, '')}` },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-aurora-cyan">
            05 — Get in touch
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Let's build{' '}
            <span className="text-gradient">something</span>
            <br />
            together.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg text-ink/70">
            Open to full-time opportunities, internships, and collaborations.
            Drop a line — I usually reply within a day.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex justify-center">
            <MagneticButton
              as="a"
              href={info.links.email}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-aurora-cyan via-aurora-violet to-aurora-amber px-10 py-4 font-medium text-midnight-950"
            >
              <span className="relative z-10 flex items-center gap-2">
                Say hello
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </MagneticButton>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-4 md:grid-cols-2">
          {channels.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="glass group flex items-center justify-between rounded-2xl px-6 py-5 text-left transition hover:border-aurora-cyan/40"
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
                  {c.label}
                </div>
                <div className="mt-1 font-display text-lg text-white">
                  {c.value}
                </div>
              </div>
              <span className="text-2xl text-ink-muted transition-all group-hover:translate-x-1 group-hover:text-aurora-cyan">
                →
              </span>
            </motion.a>
          ))}
        </div>

        <Reveal delay={0.5}>
          <footer className="mt-24 border-t border-white/5 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-ink-dim md:flex-row">
              <div className="font-mono">
                © {new Date().getFullYear()} · {info.name}
              </div>
              <div className="font-mono">
                Crafted with React · Three.js · Framer Motion
              </div>
            </div>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
