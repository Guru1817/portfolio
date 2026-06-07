import { motion } from 'framer-motion';
import { education, certifications, achievements } from '@/data/education';
import Reveal from '@/components/ui/Reveal';

export default function Journey() {
  return (
    <section id="journey" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-aurora-cyan">
            04 — Journey
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight md:text-6xl">
            Education &{' '}
            <span className="text-gradient">milestones.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-12 md:grid-cols-12">
          {/* Timeline */}
          <div className="md:col-span-7">
            <div className="relative">
              {/* Vertical animated line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                style={{ originY: 0 }}
                className="absolute left-3 top-2 h-full w-px bg-gradient-to-b from-aurora-cyan via-aurora-violet to-aurora-amber"
              />

              <div className="space-y-12">
                {education.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: 0.3 + idx * 0.2, duration: 0.7 }}
                    className="relative pl-12"
                  >
                    <span
                      className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-aurora-cyan bg-midnight-950"
                      style={{ boxShadow: '0 0 24px rgba(34, 211, 238, 0.5)' }}
                    >
                      <span className="h-2 w-2 rounded-full bg-aurora-cyan" />
                    </span>
                    <div className="font-mono text-xs uppercase tracking-wider text-aurora-cyan">
                      {item.period}
                    </div>
                    <h3 className="mt-2 font-display text-2xl">{item.degree}</h3>
                    <div className="mt-1 text-ink-muted">
                      {item.institution} · {item.location}
                    </div>
                    <div className="mt-3 text-sm text-ink/80">{item.detail}</div>
                    {item.coursework.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.coursework.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-ink/70"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Side: Certs + Achievements */}
          <div className="space-y-8 md:col-span-5">
            <Reveal delay={0.2}>
              <div className="glass relative overflow-hidden rounded-2xl p-6">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
                  style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
                />
                <h3 className="relative font-display text-lg uppercase tracking-wider">
                  Certifications
                </h3>
                <ul className="relative mt-5 space-y-4">
                  {certifications.map((c, i) => (
                    <li key={i} className="border-l-2 border-aurora-violet/50 pl-4">
                      <div className="text-sm text-white">{c.name}</div>
                      <div className="mt-1 font-mono text-xs text-ink-muted">
                        {c.issuer} · {c.year}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="glass relative overflow-hidden rounded-2xl p-6">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
                  style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }}
                />
                <h3 className="relative font-display text-lg uppercase tracking-wider">
                  Achievements
                </h3>
                <ul className="relative mt-5 space-y-3">
                  {achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-ink/80">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-aurora-amber" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
