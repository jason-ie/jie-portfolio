'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useScramble } from 'use-scramble';

const experiences = [
  {
    date: 'Feb 2026 – Present',
    role: 'Quantitative Research Assistant',
    company: "Northeastern University, D'Amore-McKim",
    desc: 'Algorithmic signal generation, gradient boosting pipelines, and walk-forward backtesting for momentum strategies. Designed an algorithmic signal generation framework in Python and Pandas to exploit time-series and cross-sectional momentum, analyzing return auto-covariance and lead-lag effects across historical market data. Main focus of the research is momentum strategies.',
    tag: 'Research',
  },
  {
    date: 'Jun 2025 – Aug 2025',
    role: 'Software Engineer Intern',
    company: 'Capital One',
    desc: 'Java Spring Boot backend for metadata governance on AWS DynamoDB. Automated CI/CD with Docker and Jenkins, and built a React/TypeScript frontend with TanStack Query. In charge of the migration from legacy database to DynamoDB and environment setup.',
    tag: 'SWE',
  },
  {
    date: 'Jul 2024 – Dec 2024',
    role: 'Software Developer Co-op',
    company: 'enLabel Global Services',
    desc: 'Led development of full-stack Next.js registration portal onboarding 10,000+ users with OAuth 2.0 (PKCE). Optimized SQL queries across a 1,000+ table database serving 50,000+ active users. Also worked on C#, ASP.NET application for user data understanding. ',
    tag: 'SWE',
  },
  {
    date: 'Dec 2023 – Apr 2024',
    role: 'Software Engineer Intern',
    company: 'SuperCare Health',
    desc: 'Optimized webhook-based data pipeline reducing latency and improving system responsiveness. Dealt with direct critical patient data workflows and added MongoDB fax system capable of handling 20,000+ daily pages via the RingCentral API.',
    tag: 'SWE',
  },
];

export default function Experience() {
  const labelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(labelRef, { once: false });

  const { ref: scrambleRef, replay } = useScramble({
    text: 'Experience',
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
      id="experience"
      style={{
        padding: '0 56px 120px',
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

      {/* Experience List */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {experiences.map((exp, i) => (
          <ExperienceRow key={exp.date + exp.role} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}

function ExperienceRow({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
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
        display: 'grid',
        gridTemplateColumns: '160px 1fr auto',
        alignItems: 'start',
        borderBottom: '1px solid var(--rule)',
        padding: '24px 0',
        gap: '24px',
      }}
    >
      {/* Date */}
      <span
        style={{
          fontFamily: 'var(--font-jetbrains-mono), monospace',
          fontWeight: 300,
          fontSize: '11px',
          letterSpacing: '0.08em',
          color: 'var(--text-sub)',
          paddingTop: '3px',
          whiteSpace: 'nowrap',
        }}
      >
        {exp.date}
      </span>

      {/* Role + Company + Desc */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-fraunces), serif',
            fontWeight: 600,
            fontSize: 'clamp(16px, 1.5vw, 22px)',
            letterSpacing: '-0.01em',
            color: 'var(--text)',
            marginBottom: '4px',
            fontVariationSettings: "'opsz' 24, 'SOFT' 5",
          }}
        >
          {exp.role}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontWeight: 500,
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '6px',
          }}
        >
          {exp.company}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-space-grotesk), sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
          }}
        >
          {exp.desc}
        </div>
      </div>

      {/* Badge Pill */}
      <div
        style={{
          border: '1px solid var(--accent-border)',
          borderRadius: '100px',
          padding: '4px 14px',
          fontFamily: 'var(--font-space-grotesk), sans-serif',
          fontWeight: 400,
          fontSize: '11px',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          whiteSpace: 'nowrap',
          marginTop: '2px',
        }}
      >
        {exp.tag}
      </div>
    </motion.div>
  );
}
