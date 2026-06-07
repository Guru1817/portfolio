import { motion } from 'framer-motion';
import { skillGroups, groupDescriptions } from '@/data/skills';
import Reveal from '@/components/ui/Reveal';

const accentMap = {
  cyan: { glow: '#22d3ee', bullet: 'bg-aurora-cyan' },
  violet: { glow: '#7c3aed', bullet: 'bg-aurora-violet' },
  amber: { glow: '#f59e0b', bullet: 'bg-aurora-amber' },
};

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-aurora-cyan">
            02 — Stack
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight md:text-6xl">
            Tools I build with —{' '}
            <span className="text-gradient">where code meets intelligence.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">
            Strong in Java backend, growing in AI/ML. I'm targeting teams building
            products where backend engineering meets machine learning — and I'm
            actively sharpening both ends of that toolkit.
          </p>
        </Reveal>

        {/* AI/ML focus banner */}
        <Reveal delay={0.3}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-aurora-amber/20 bg-gradient-to-br from-aurora-amber/10 via-aurora-violet/5 to-transparent p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-aurora-amber">
                  Focus area
                </div>
                <h3 className="mt-3 font-display text-2xl text-white md:text-3xl">
                  Backend engineering, augmented by AI/ML.
                </h3>
                <p className="mt-3 text-sm text-ink/80 md:text-base">
                  Comfortable with Python, NumPy, Pandas, and the basics of model
                  training. I'm focused on roles where I can build robust Java
                  backends that integrate ML services — recommendation systems,
                  intelligent automation, NLP-powered features.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 md:flex-shrink-0">
                {['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Model APIs'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-aurora-amber/30 bg-aurora-amber/5 px-3 py-1.5 font-mono text-xs text-aurora-amber"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Skill grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, idx) => {
            const accent = accentMap[group.accent] || accentMap.cyan;
            return (
              <Reveal key={group.category} delay={0.05 * idx}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  className="glass relative h-full overflow-hidden rounded-2xl p-6"
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${accent.glow}, transparent)`,
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-lg uppercase tracking-wider text-white">
                        {group.category}
                      </h3>
                      <span className="font-mono text-[10px] text-ink-dim">
                        0{idx + 1}
                      </span>
                    </div>
                    {groupDescriptions[group.category] && (
                      <p className="mt-2 text-xs leading-relaxed text-ink/60">
                        {groupDescriptions[group.category]}
                      </p>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <motion.span
                          key={item.name}
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-ink/90 transition hover:border-aurora-cyan/40 hover:bg-aurora-cyan/5"
                        >
                          <span className={`h-1 w-1 rounded-full ${accent.bullet}`} />
                          {item.name}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
