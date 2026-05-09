'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScramble } from 'use-scramble';

const links = [
  { label: 'Email', href: 'mailto:ie.jasonray10@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/jason-ie' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jason-ie' },
  { label: 'Resume', href: '/Jason_Ie_Resume.pdf' },
];

export default function Contact() {
  const labelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(labelRef, { once: false });

  const { ref: scrambleRef, replay } = useScramble({
    text: 'Contact',
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

  return (
    <section
      id="contact"
      className="contact-section"
      style={{
        padding: '0 56px 80px',
      }}
    >
      {/* Section Label */}
      <div
        ref={labelRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '64px',
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

      {/* Large Heading */}
      <motion.div
        initial={{ y: 28, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ marginBottom: '64px' }}
      >
        <div
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 700,
            fontSize: 'clamp(48px, 7vw, 100px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            fontVariationSettings: "'opsz' 96, 'SOFT' 20",
            color: 'var(--text)',
          }}
        >
          Let&apos;s
        </div>
        <div
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 700,
            fontSize: 'clamp(48px, 7vw, 100px)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            fontStyle: 'italic',
            fontVariationSettings: "'opsz' 96, 'SOFT' 60",
            color: 'var(--accent)',
          }}
        >
          talk.
        </div>
      </motion.div>

      {/* Link Row */}
      <div
        className="contact-links"
        style={{
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap',
          marginBottom: '64px',
        }}
      >
        {links.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={
              link.href.startsWith('http') ? 'noopener noreferrer' : undefined
            }
            whileHover={{ color: 'var(--accent)' }}
            style={{
              fontFamily: 'var(--font-space-grotesk), sans-serif',
              fontWeight: 400,
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'color 0.2s ease',
            }}
          >
            {link.label}
            <span style={{ fontSize: '11px' }}>↗</span>
          </motion.a>
        ))}
      </div>

      {/* Full-width rule */}
      <div
        style={{
          width: '100%',
          height: '1px',
          background: 'var(--rule)',
          marginBottom: '24px',
        }}
      />

      {/* Footer */}
      <div
        className="contact-footer"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            color: 'var(--text-sub)',
          }}
        >
          © 2026 Jason Ie
        </span>
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: 'var(--text-sub)',
          }}
        >
          Based in the US
        </span>
      </div>
    </section>
  );
}
