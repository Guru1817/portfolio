import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Custom blob cursor that lags behind the mouse, morphs based on hover context.
 * Hides on touch / coarse-pointer devices (phones, tablets).
 */

// Detects "this device's primary input is touch / coarse pointer".
// Using both checks because some devices report differently.
function detectTouch() {
  if (typeof window === 'undefined') return false;
  const noHover = window.matchMedia('(hover: none)').matches;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  return noHover || coarsePointer;
}

export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState('default');
  const [visible, setVisible] = useState(false);
  // Use state (not ref) so the component re-renders when we detect touch and
  // the cursor disappears immediately.
  const [isTouch, setIsTouch] = useState(() => detectTouch());

  useEffect(() => {
    if (isTouch) return;

    // Re-check on viewport changes (rotation, devtools resize, plug-in mouse, etc.)
    const hoverMq = window.matchMedia('(hover: none)');
    const pointerMq = window.matchMedia('(pointer: coarse)');
    const onChange = () => setIsTouch(detectTouch());
    hoverMq.addEventListener('change', onChange);
    pointerMq.addEventListener('change', onChange);

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);

    // Hover state detection for cursor variants
    const updateVariant = (e) => {
      const target = e.target;
      if (!target?.closest) return;
      if (target.closest('a, button, [data-cursor="link"]')) {
        setVariant('link');
      } else if (target.closest('[data-cursor="text"]')) {
        setVariant('text');
      } else {
        setVariant('default');
      }
    };
    window.addEventListener('mouseover', updateVariant);

    return () => {
      hoverMq.removeEventListener('change', onChange);
      pointerMq.removeEventListener('change', onChange);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
      window.removeEventListener('mouseover', updateVariant);
    };
  }, [isTouch]);

  // Touch / coarse-pointer devices: render nothing.
  if (isTouch) return null;

  const variants = {
    default: { width: 18, height: 18, opacity: visible ? 1 : 0 },
    link: { width: 56, height: 56, opacity: visible ? 0.85 : 0 },
    text: { width: 90, height: 90, opacity: visible ? 0.4 : 0 },
  };

  return (
    <>
      {/* Outer blob */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[999] rounded-full mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle, rgba(34,211,238,0.9) 0%, rgba(124,58,237,0.4) 60%, transparent 100%)',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          x: pos.x,
          y: pos.y,
          ...variants[variant],
        }}
        transition={{
          x: { type: 'spring', stiffness: 500, damping: 40, mass: 0.5 },
          y: { type: 'spring', stiffness: 500, damping: 40, mass: 0.5 },
          width: { type: 'spring', stiffness: 300, damping: 25 },
          height: { type: 'spring', stiffness: 300, damping: 25 },
          opacity: { duration: 0.2 },
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[999] h-1.5 w-1.5 rounded-full bg-white"
        style={{ translateX: '-50%', translateY: '-50%' }}
        animate={{ x: pos.x, y: pos.y, opacity: visible ? 1 : 0 }}
        transition={{ x: { duration: 0 }, y: { duration: 0 } }}
      />
    </>
  );
}
