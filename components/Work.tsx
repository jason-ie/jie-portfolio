'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useScramble } from 'use-scramble';

type Project = {
  id: string;
  num: string;
  tag: string;
  name: string;
  stack: string;
  description: string;
  github?: string;
  liveUrl?: string;
  demoUrl?: string;
  caseStudy?: string;
  caption: string;
  tint: string;
  images?: string[];
};

const projects: Project[] = [
  {
    id: 'card-0',
    num: '01',
    tag: 'ML / Vision',
    name: 'Vera',
    stack: 'Python · FastAPI · pgvector · React',
    description:
      "Multi-stage vision pipeline that detects garments in outfit photos using Gemini Vision and SAM, then ranks shoppable matches via CLIP embeddings and cosine similarity. If you've ever came across an outflit online or in a photo that you wanted to wear yourself but didn't know where to look, check this out. Upload a picture and this will find your outfit for you with links to conveniently purchase.",
    caption: 'Find every piece of every outfit.',
    github: 'https://github.com/jason-ie/vera',
    liveUrl: 'https://vera-vert.vercel.app/',
    tint: 'rgba(200,130,200,0.05)',
    images: [
      '/projects/vera-1.png',
      '/projects/vera-2.png',
      '/projects/vera-3.png',
    ],
  },
  {
    id: 'card-1',
    num: '02',
    tag: 'Quant',
    name: 'Strategy',
    stack: 'Python · NumPy · Pandas',
    description:
      'Long/short equity strategy combining RSI, Mean Reversion, Ichimoku Cloud, and ATR volatility gating. Walk-forward backtested across 4 of 5 rolling windows, projecting 45.6% CAGR and a 1.37 Sortino ratio. Looking for a way to gain a composite score signal that will outperform the market. Built to trade on high growth stocks, taking volatility into account with every trade. Check out the demo for more information about the strategy.',
    caption:
      'Composite trading strategy combining 4 indicators: RSI, Ichimoku Cloud, ATR, MR.',
    github: 'https://github.com/jason-ie/trading-strategy',
    demoUrl: 'https://canva.link/x627h6t1vs8k484',
    tint: 'rgba(244,200,100,0.05)',
    images: [
      '/projects/trading-1.png',
      '/projects/trading-2.png',
      '/projects/trading-3.png',
    ],
  },
  {
    id: 'card-2',
    num: '03',
    tag: 'Full Stack',
    name: 'NuSync',
    stack: 'TypeScript · MongoDB · Socket.io · React',
    description:
      'Real-time social platform with messaging, friend systems, Spotify music sharing, and an AI-powered game engine. Inspired by StackOverflow, students can look for information about classes, professors, etc. and directly message anyone in their friend network, privately or publically. Share songs, code snippets, and play games with each other. Deployed on Render with GitHub Actions CI/CD.',
    caption: 'Connect with your university. Classes, Music, Games.',
    github: 'https://github.com/jason-ie/nusync',
    liveUrl: 'https://www.nu-sync.com/',
    tint: 'rgba(100,149,237,0.05)',
    images: ['/projects/nu-1.png', '/projects/nu-2.png', '/projects/nu-3.png'],
  },
  {
    id: 'card-3',
    num: '04',
    tag: 'Full Stack',
    name: 'Parq',
    stack: 'React · Firebase · Google Maps',
    description:
      "Peer-to-peer parking marketplace where owners list spots and renters book by location. Created for concert lovers who always have trouble finding parking. Find your upcoming event, nearby driveways/spots that people aren't using, and making parking a whole lot easier. Features real-time map views, role-based dashboards, and Google Places search.",
    caption: 'List your spot. Book by location.',
    github: 'https://github.com/jason-ie/parq',
    tint: 'rgba(100,200,150,0.05)',
    images: [
      '/projects/parq-1.png',
      '/projects/parq-2.png',
      '/projects/parq-3.png',
    ],
  },
  {
    id: 'card-4',
    num: '05',
    tag: 'Mobile',
    name: 'Detour',
    stack: 'Kotlin · Android · Amadeus API',
    description:
      'Mobile application for discovering optimal flight stopovers across Asia. Raises the new idea of cheapest/most convenient flight routes. Instead of just finding the cheapest flights, what if we extended the trip into multiple cities where the aggregate price is cheaper than the direct AND you get to visit more destinations? Queries the Amadeus API for real-time flight offers, suggests cities by route, and surfaces fare comparisons.',
    caption: 'Discover optimal stopovers across Asia.',
    github: 'https://github.com/jason-ie/detour-app',
    demoUrl:
      'https://docs.google.com/presentation/d/e/2PACX-1vTFS9Y-RpfnE78cxjzwQT0AzHWnwbns2UiqYKWC_5OD1aCMK1EhyGOfk8w9VM0se9o0v4Ldh47nzR15/pub?start=false&loop=false&delayms=3000',
    tint: 'rgba(255,150,100,0.05)',
    images: ['/projects/detour.png'],
  },
];

export default function Work() {
  const labelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(labelRef, { once: false });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { ref: scrambleRef, replay } = useScramble({
    text: 'Selected Work',
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 4,
    seed: 2,
    chance: 0.85,
    overdrive: false,
    overflow: false,
  });

  useEffect(() => {
    if (inView) replay();
  }, [inView, replay]);

  // Scroll lock when drawer open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedId]);

  const selectedProject = projects.find((p) => p.id === selectedId) ?? null;

  return (
    <section
      id="work"
      className="work-section"
      style={{
        padding: '120px 56px',
        maxWidth: '100%',
        position: 'relative',
      }}
    >
      {/* Section Label */}
      <div
        ref={labelRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '48px',
        }}
      >
        <span
          ref={scrambleRef}
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text)',
          }}
        />
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'var(--rule)',
          }}
        />
      </div>

      {/* Grid — always visible */}
      <div
        className="work-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'rgba(232,226,244,0.05)',
        }}
      >
        {projects.map((project, i) => (
          <BentoCard
            key={project.id}
            project={project}
            index={i}
            fullWidth={false}
            onClick={() => setSelectedId(project.id)}
          />
        ))}
        <ComingSoonCard
          fullWidth={projects.length % 2 === 0}
          index={projects.length}
        />
      </div>

      {/* Backdrop + Side Drawer */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedId(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10, 11, 15, 0.75)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: 100,
              }}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              className="work-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '48vw',
                minWidth: '380px',
                background: `linear-gradient(135deg, #151720, ${selectedProject.tint} 100%), #151720`,
                borderLeft: '1px solid rgba(232,226,244,0.07)',
                overflowY: 'auto',
                zIndex: 101,
              }}
            >
              {/* Content fades in after drawer settles */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ padding: '32px', position: 'relative', zIndex: 1 }}
              >
                {/* Back button */}
                <button
                  onClick={() => setSelectedId(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-dim)',
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    padding: 0,
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  ← back
                </button>

                {/* Tag */}
                <div
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: '8px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '10px',
                  }}
                >
                  {selectedProject.tag}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontFamily: 'var(--font-fraunces), serif',
                    fontWeight: 700,
                    fontSize: '36px',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    color: 'var(--text)',
                    marginBottom: '8px',
                  }}
                >
                  {selectedProject.name}
                </div>

                {/* Stack */}
                <div
                  style={{
                    fontFamily: 'var(--font-jetbrains-mono), monospace',
                    fontSize: '11px',
                    color: 'var(--text-secondary)',
                    marginBottom: '20px',
                  }}
                >
                  {selectedProject.stack}
                </div>

                {/* Image carousel */}
                {selectedProject.images &&
                  selectedProject.images.length > 0 && (
                    <ProjectCarousel images={selectedProject.images} />
                  )}

                {/* Divider */}
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    background: 'var(--rule)',
                    marginBottom: '20px',
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: '13px',
                    lineHeight: 1.75,
                    color: 'var(--text-secondary)',
                    marginBottom: '28px',
                  }}
                >
                  {selectedProject.description}
                </p>

                {/* Links */}
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-space-grotesk), sans-serif',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        color: 'var(--bg)',
                        background: 'var(--accent)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '7px 14px',
                        borderRadius: '2px',
                      }}
                    >
                      ↗ Live Site
                    </a>
                  )}
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-space-grotesk), sans-serif',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        color: 'var(--bg)',
                        background: 'var(--accent)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '7px 14px',
                        borderRadius: '2px',
                      }}
                    >
                      ↗ Demo
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-space-grotesk), sans-serif',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        color: 'var(--text-dim)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      ↗ GitHub
                    </a>
                  )}
                  {selectedProject.caseStudy && (
                    <a
                      href={selectedProject.caseStudy}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--font-space-grotesk), sans-serif',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        color: 'var(--text-dim)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      ↗ Case Study
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .bento-card {
          transition: background 0.2s ease;
        }
        .bento-card:hover {
          background: #141720 !important;
        }
        .bento-card:hover .bento-ghost {
          opacity: 0.72 !important;
          transform: scale(1.06) translateY(-4px) !important;
        }
        .bento-card:hover .bento-arrow {
          opacity: 1 !important;
          transform: translate(0, 0) !important;
        }
        .bento-ghost {
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .bento-arrow {
          opacity: 0;
          transform: translate(-4px, 4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
      `}</style>
    </section>
  );
}

function ProjectCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Main image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '4px',
          overflow: 'hidden',
          background: 'rgba(0,0,0,0.4)',
          marginBottom: '10px',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`Screenshot ${index + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </AnimatePresence>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setIndex((i) => (i - 1 + images.length) % images.length)
              }
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(17,19,24,0.72)',
                border: '1px solid rgba(232,226,244,0.12)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >
              ‹
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(17,19,24,0.72)',
                border: '1px solid rgba(232,226,244,0.12)',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(4px)',
              }}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? '16px' : '5px',
                height: '5px',
                borderRadius: '100px',
                background:
                  i === index ? 'var(--accent)' : 'rgba(232,226,244,0.2)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.2s ease, background 0.2s ease',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ComingSoonCard({
  fullWidth,
  index,
}: {
  fullWidth: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.065,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        background: '#111318',
        minHeight: '300px',
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
        gridColumn: fullWidth ? '1 / -1' : undefined,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ghost watermark */}
      <span
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '20px',
          fontFamily: 'var(--font-fraunces), serif',
          fontSize: 'clamp(48px, 5vw, 80px)',
          fontWeight: 800,
          fontStyle: 'italic',
          color: 'var(--text)',
          opacity: 0.07,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Still in the works!
      </span>

      {/* Center content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            width: '24px',
            height: '1px',
            background: 'var(--accent)',
            opacity: 0.4,
            margin: '0 auto 14px',
          }}
        />
        <div
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-sub)',
          }}
        >
          Coming Soon
        </div>
        <div
          style={{
            width: '24px',
            height: '1px',
            background: 'var(--accent)',
            opacity: 0.4,
            margin: '14px auto 0',
          }}
        />
      </div>
    </motion.div>
  );
}

function BentoCard({
  project,
  index,
  fullWidth,
  onClick,
}: {
  project: Project;
  index: number;
  fullWidth?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="bento-card work-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
      initial={{ y: 28, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.065,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        background: `linear-gradient(135deg, #111318, ${project.tint} 100%), #111318`,
        backgroundColor: '#111318',
        minHeight: '300px',
        padding: '28px',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        gridColumn: fullWidth ? '1 / -1' : undefined,
      }}
    >
      {/* Top-left: project number */}
      <span
        style={{
          position: 'absolute',
          top: '22px',
          left: '28px',
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontSize: '10px',
          letterSpacing: '0.1em',
          opacity: 0.32,
          color: 'var(--text)',
        }}
      >
        {project.num}
      </span>

      {/* Top-right: arrow */}
      <span
        className="bento-arrow"
        style={{
          position: 'absolute',
          top: '22px',
          right: '28px',
          fontSize: '14px',
          color: 'var(--text)',
        }}
      >
        ↗
      </span>

      {/* Background ghost — project name */}
      <span
        className="bento-ghost"
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '20px',
          fontFamily: 'var(--font-fraunces), serif',
          fontSize: 'clamp(48px, 5vw, 80px)',
          fontWeight: 800,
          fontStyle: 'italic',
          color: 'var(--text)',
          opacity: 0.42,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {project.name}
      </span>

      {/* Bottom-left: tag, caption, stack */}
      <div
        style={{
          position: 'absolute',
          bottom: '28px',
          left: '28px',
          maxWidth: '55%',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: '8px',
          }}
        >
          {project.tag}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            color: 'rgba(232,226,244,0.78)',
            lineHeight: 1.4,
            marginBottom: '10px',
          }}
        >
          {project.caption}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '10px',
            color: 'var(--text-secondary)',
          }}
        >
          {project.stack}
        </div>
      </div>
    </motion.div>
  );
}
