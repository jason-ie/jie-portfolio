'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScramble } from 'use-scramble';

const stack = [
  'Python',
  'TypeScript / JS',
  'Node / Express',
  'Java / SpringBoot',
  'AWS / Cloud',
  'SQL',
  'Docker / K8s',
  'C#',
  'Git',
];

const interests = [
  'Chess',
  'Trading',
  'Coffee',
  'Basketball',
  'Poker',
  'Golf',
  'Travel',
];

export default function About() {
  const labelRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const labelInView = useInView(labelRef, { once: false });
  const ruleInView = useInView(ruleRef, { once: true });
  const leftInView = useInView(leftRef, { once: true });
  const rightInView = useInView(rightRef, { once: true });

  const { ref: scrambleRef, replay } = useScramble({
    text: 'About',
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
    if (labelInView) replay();
  }, [labelInView, replay]);

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: '120px 56px',
        overflow: 'hidden',
      }}
    >
      <div>
        {/* Ghost number */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            right: '56px',
            fontFamily: 'Courier New, monospace',
            fontSize: '120px',
            fontWeight: 700,
            color: 'var(--text)',
            opacity: 0.025,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          @jason-ie
        </span>

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
          {/* Animated rule */}
          <div ref={ruleRef} style={{ flex: 1, overflow: 'hidden' }}>
            <motion.div
              style={{
                height: '1px',
                background: 'var(--rule)',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: ruleInView ? 1 : 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </div>

        {/* Two-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          {/* Left column */}
          <motion.div
            ref={leftRef}
            initial={{ y: 24, opacity: 0 }}
            animate={leftInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '28px',
                  height: '1px',
                  background: 'var(--accent)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-space-grotesk), sans-serif',
                  fontWeight: 400,
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}
              >
                Who I am
              </span>
            </div>

            {/* Headline */}
            <div
              style={{
                fontFamily: 'var(--font-fraunces), serif',
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: 'clamp(32px, 4vw, 56px)',
                lineHeight: 1.1,
                marginBottom: '24px',
              }}
            >
              <span style={{ color: 'var(--text)' }}>Making computers go </span>
              <span style={{ color: 'var(--green, #22C55E)' }}>fast</span>
              <br />
              <span style={{ color: 'var(--text)' }}>
                so I don&apos;t have to think{' '}
              </span>
              <span style={{ color: 'var(--red, #EF4444)' }}>slow</span>
              <span style={{ color: 'var(--text)' }}>.</span>
            </div>

            {/* Rule */}
            <div
              style={{
                width: '100%',
                height: '1px',
                background: 'var(--rule)',
                marginBottom: '20px',
              }}
            />

            {/* Bio */}
            <p
              style={{
                fontFamily: 'var(--font-space-grotesk), sans-serif',
                fontWeight: 300,
                fontSize: '13px',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              I like building things and figuring out how to make them better.
              Smarter trading strategies, lines on sports betting markets, the
              occasional app for a fashion intervention. Tech gives me a ceiling
              I'll never actually hit, and finance makes it interesting. There's
              always something new to learn, a taller mountain to climb, and
              that's what I love about it.
            </p>
          </motion.div>

          {/* Right column */}
          <motion.div
            ref={rightRef}
            initial={{ y: 24, opacity: 0 }}
            animate={rightInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Stack grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                marginBottom: '24px',
              }}
            >
              {stack.map((item) => (
                <div
                  key={item}
                  style={{
                    border: '1px solid rgba(232,226,244,0.18)',
                    borderRadius: '3px',
                    padding: '8px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      height: '3px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      opacity: 0.6,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-jetbrains-mono), monospace',
                      fontSize: '10px',
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Interests */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {interests.map((interest) => (
                <span
                  key={interest}
                  style={{
                    border: '1px solid rgba(232,226,244,0.18)',
                    borderRadius: '100px',
                    padding: '5px 12px',
                    fontFamily: 'var(--font-space-grotesk), sans-serif',
                    fontSize: '12px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
