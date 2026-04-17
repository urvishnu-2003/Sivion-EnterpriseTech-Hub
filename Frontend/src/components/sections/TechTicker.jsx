import React from 'react';
import { motion } from 'framer-motion';
import './TechTicker.css';

const techRow1 = [
  { name: 'Java', slug: 'openjdk' },
  { name: 'Spring Boot', slug: 'spring' },
  { name: 'React', slug: 'react' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'AWS', slug: 'amazon-aws' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Kubernetes', slug: 'kubernetes' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MongoDB', slug: 'mongodb' }
];

const techRow2 = [
  { name: 'GraphQL', slug: 'graphql' },
  { name: 'Redis', slug: 'redis' },
  { name: 'Kafka', slug: 'apachekafka' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Jenkins', slug: 'jenkins' },
  { name: 'Terraform', slug: 'terraform' },
  { name: 'Python', slug: 'python' },
  { name: 'Angular', slug: 'angular' },
  { name: 'Azure', slug: 'microsoft-azure' },
  { name: 'Git', slug: 'git' }
];

const TechLogo = ({ slug, name }) => (
  <img
    src={`https://cdn.simpleicons.org/${slug}/00F5FF`}
    alt={name}
    style={{
      width: 18,
      height: 18,
      objectFit: 'contain',
      filter: 'brightness(0) invert(1)',
      opacity: 0.9,
      marginRight: '0.25rem'
    }}
    onError={(e) => { e.target.style.display = 'none'; }}
  />
);

const TechTicker = () => (
  <section className="technologies-ticker-section">
    <div className="section-header" style={{ marginBottom: '3rem' }}>
      <motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>⚙️ Tech Stack</motion.span>
      <motion.h2 className="section-title" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
        Technologies We <span className="gradient-text">Master</span>
      </motion.h2>
    </div>
    {[{ items: techRow1, dir: 'row-1' }, { items: techRow2, dir: 'row-2' }].map(({ items, dir }) => (
      <div key={dir} style={{ overflow: 'hidden', padding: '0.75rem 0' }}>
        <div className={`ticker-track ticker-${dir}`}>
          {[...items, ...items].map((tech, i) => (
            <div key={i} className="tech-badge">
              <TechLogo slug={tech.slug} name={tech.name} />
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    ))}
  </section>
);

export default TechTicker;
