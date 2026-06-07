import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { info } from '@/data/info';
import Reveal from '@/components/ui/Reveal';

function StatCounter({ value, suffix, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const isFloat = value % 1 !== 0;
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(isFloat ? +(value * eased).toFixed(1) : Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center md:text-left">
      <div className="font-display text-4xl text-gradient-cool md:text-5xl">
        {display}
        <span className="text-aurora-amber">{suffix}</span>
      </div>
      <div className="mt-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
        {label}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-aurora-cyan">
            01 — About
          </div>
        </Reveal>

        <div className="mt-6 grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">
                Backend craftsman.{' '}
                <span className="text-gradient">
                  Curious about everything else.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mt-8 text-lg leading-relaxed text-ink/80 md:text-xl">
                {info.bio}
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
                {info.stats.map((s) => (
                  <StatCounter key={s.label} {...s} />
                ))}
              </div>
            </Reveal>
          </div>

          {/* Now panel */}
          <div className="md:col-span-5">
            <Reveal delay={0.3}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="glass relative overflow-hidden rounded-2xl p-8"
              >
                {/* Subtle inner gradient */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    background:
                      'radial-gradient(circle at 100% 0%, rgba(34,211,238,0.25), transparent 60%)',
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-aurora-amber opacity-75" />
                      <span className="relative h-2 w-2 rounded-full bg-aurora-amber" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
                      Now
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl">
                    What I'm working on
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {info.now.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                        className="flex items-start gap-3 text-sm text-ink/80"
                      >
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-aurora-cyan" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
