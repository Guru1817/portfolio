# Gurupada Nayak — Portfolio

Personal portfolio site. Built with React, Vite, Tailwind, Framer Motion,
GSAP, Lenis, and React Three Fiber.

## Concept

A "Midnight Aurora" interactive portfolio — fluid WebGL shader background,
custom blob cursor, magnetic buttons, smooth scroll, and animated sections.

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion 11
- GSAP 3 (ScrollTrigger)
- Lenis (smooth scroll)
- Three.js + React Three Fiber + Drei (shader background)

## Scripts

```bash
npm install      # install deps
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview production build
npm run lint     # lint
```

## Structure

```
src/
├── components/
│   ├── sections/   # page sections (Hero, About, Skills, …)
│   ├── shaders/    # WebGL background
│   └── ui/         # cursor, nav, loader, primitives
├── data/           # info, projects, skills, education
├── hooks/          # custom React hooks
└── styles/         # globals
```

## Customization

Edit content in `src/data/`:

- `info.js` — name, bio, links, stats
- `projects.js` — projects list
- `skills.js` — skill categories
- `education.js` — education, certs, achievements
