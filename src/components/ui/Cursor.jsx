import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Custom blob cursor that lags behind the mouse, morphs based on hover context.
 * Hides on touch devices.
 */
export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState('default');
  const [visible, setVisible] = useState(false);
  const isTouch = useRef(false);

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches;
    if (isTouch.current) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);

    // Hover detection
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
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
      window.removeEventListener('mouseover', updateVariant);
    };
  }, []);

  if (isTouch.current) return null;

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
