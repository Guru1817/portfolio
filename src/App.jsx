import { useState } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import FluidBackground from '@/components/shaders/FluidBackground';
import Cursor from '@/components/ui/Cursor';
import Loader from '@/components/ui/Loader';
import Nav from '@/components/ui/Nav';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Journey from '@/components/sections/Journey';
import Contact from '@/components/sections/Contact';
import SEOContent from '@/components/seo/SEOContent';

export default function App() {
  const [ready, setReady] = useState(false);
  const reducedMotion = useReducedMotion();

  // Smooth scroll (skipped if user prefers reduced motion)
  useLenis();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {!reducedMotion && <FluidBackground />}
      {reducedMotion && (
        <div
          className="fixed inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at top, #11142a 0%, #05060f 60%)',
          }}
        />
      )}

      <Cursor />
      <Loader onDone={() => setReady(true)} />

      <Nav />

      <main className="relative">
        <SEOContent />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
    </div>
  );
}
