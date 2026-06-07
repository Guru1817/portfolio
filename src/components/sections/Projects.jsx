import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import Reveal from '@/components/ui/Reveal';

function ProjectCard({ project, index }) {
  const isReversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative"
    >
      <div
        className={`grid items-center gap-8 md:grid-cols-12 md:gap-12 ${
          isReversed ? 'md:[direction:rtl]' : ''
        }`}
      >
        {/* Visual side */}
        <div className="md:col-span-6 md:[direction:ltr]">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/5"
            style={{
              background: `linear-gradient(135deg, ${project.accent}22, ${project.accentTo}22)`,
            }}
          >
            {/* Project image fills the card */}
            {project.image && (
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            )}

            {/* Dark scrim for readability of overlays */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(5,6,15,0.15) 0%, rgba(5,6,15,0.0) 30%, rgba(5,6,15,0.0) 70%, rgba(5,6,15,0.5) 100%)',
              }}
            />

            {/* Project number */}
            <div className="absolute left-6 top-6 font-mono text-xs uppercase tracking-[0.3em] text-white/70">
              0{index + 1} / 0{projects.length}
            </div>

            {/* Status badge */}
            <div className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/90 backdrop-blur">
              {project.status}
            </div>

            {/* Hover shimmer */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%]" />
            </div>

            {/* Footer: year + role */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
                {project.year}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
                {project.role}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Text side */}
        <div className="md:col-span-6 md:[direction:ltr]">
          {/* Suraag-style logo + brand line */}
          {project.logo && (
            <div className="mb-5 flex items-center gap-3">
              <img
                src={project.logo}
                alt={`${project.title} logo`}
                className="h-12 w-12 rounded-xl"
              />
              {project.badge && (
                <span
                  className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]"
                  style={{
                    borderColor: `${project.accent}55`,
                    color: project.accent,
                    background: `${project.accent}11`,
                  }}
                >
                  {project.badge}
                </span>
              )}
            </div>
          )}

          <div
            className="font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: project.accent }}
          >
            {project.subtitle}
          </div>
          <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight md:text-4xl">
            {project.title}
          </h3>

          {project.liveUrl && project.liveLabel && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs text-ink/60 underline-offset-4 transition hover:text-aurora-cyan hover:underline"
            >
              <span className="text-aurora-cyan">↗</span> {project.liveLabel}
            </a>
          )}

          <p className="mt-4 text-base leading-relaxed text-ink/80 md:text-lg">
            {project.description}
          </p>

          {/* Highlights */}
          <ul className="mt-6 space-y-2.5">
            {project.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink/70">
                <span
                  className="mt-1.5 inline-block h-1 w-3 flex-shrink-0 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${project.accent}, ${project.accentTo})`,
                  }}
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {/* Stack */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-ink/80"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:border-aurora-cyan/60 hover:bg-aurora-cyan/10"
              >
                Visit live
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium transition hover:border-white/40"
              >
                Source
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-aurora-cyan">
            03 — Selected work
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight md:text-6xl">
            Things I've{' '}
            <span className="text-gradient">built recently.</span>
          </h2>
        </Reveal>

        <div className="mt-20 space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
