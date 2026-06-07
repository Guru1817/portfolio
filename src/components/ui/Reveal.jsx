import { motion } from 'framer-motion';

/**
 * Wrap content with a viewport-triggered reveal animation.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
