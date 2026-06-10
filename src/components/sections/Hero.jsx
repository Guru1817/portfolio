import { motion } from 'framer-motion';
import { info } from '@/data/info';
import MagneticButton from '@/components/ui/MagneticButton';

const titleVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 1.4 },
  },
};

const letterVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

function AnimatedTitle({ text, className = '' }) {
  return (
    <motion.span
      variants={titleVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block ${className}`}
    >
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={letterVariants} className="inline-block">
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 pb-12"
    >
      {/* Floating orbs for depth */}
      <motion.div
        className="pointer-events-none absolute left-[6%] top-[18%] h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #22d3ee, transparent 70%)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute right-[6%] bottom-[12%] h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-12 md:gap-16">
        {/* LEFT: text */}
        <div className="md:col-span-7">
          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-aurora-cyan opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-aurora-cyan" />
            </span>
            <span className="font-mono tracking-wider text-ink-muted">
              AVAILABLE FOR OPPORTUNITIES
            </span>
          </motion.div>

          {/* Big name */}
          <h1 className="font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.95] tracking-tight">
            <AnimatedTitle text="Gurupada" className="text-white" />
            <br />
            <AnimatedTitle text="Nayak" className="text-gradient" />
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
            className="mt-8 max-w-xl font-mono text-sm uppercase tracking-[0.2em] text-ink-muted md:text-base"
          >
            {info.tagline}
          </motion.p>

          {/* Sub bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.8 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/80 md:text-lg"
          >
            {info.shortBio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              as="a"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-aurora-cyan via-aurora-violet to-aurora-amber px-7 py-3 font-medium text-midnight-950"
            >
              <span className="relative z-10">View my work</span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href={info.resume}
              download
              className="group inline-flex items-center gap-2 rounded-full border border-aurora-cyan/40 bg-aurora-cyan/5 px-6 py-3 font-medium text-aurora-cyan backdrop-blur transition hover:bg-aurora-cyan/10"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume</span>
            </MagneticButton>

            <MagneticButton
              as="a"
              href={info.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3 font-medium backdrop-blur transition hover:border-aurora-cyan/60"
            >
              GitHub →
            </MagneticButton>
          </motion.div>
        </div>

        {/* RIGHT: photo orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative mx-auto md:col-span-5 md:mx-0"
        >
          <div className="relative aspect-square w-[260px] sm:w-[300px] md:w-full md:max-w-[420px]">
            {/* Orbiting glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, #22d3ee, #7c3aed, #f59e0b, #22d3ee)',
                filter: 'blur(28px)',
                opacity: 0.55,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -inset-3 rounded-full border border-white/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-aurora-cyan" />
              <div className="absolute -bottom-1 left-1/3 h-1.5 w-1.5 rounded-full bg-aurora-amber" />
            </motion.div>

            {/* Photo */}
            <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-midnight-900 shadow-[0_30px_120px_-20px_rgba(34,211,238,0.45)]">
              <img
                src={info.photo}
                alt={info.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Graceful fallback if photo not yet placed
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Inner gradient overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(5,6,15,0.5) 100%)',
                }}
              />
            </div>

            {/* Floating badge: location */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.6 }}
              className="glass absolute -left-4 bottom-6 rounded-full px-4 py-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="text-aurora-cyan">●</span>
                <span className="font-mono text-ink/90">{info.location}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-ink-muted"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-aurora-cyan to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
