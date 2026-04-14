import React from 'react';
import TiltCard from '../ui/TiltCard';
import { motion } from 'framer-motion';
import { Code2, Cloud, Cpu, LayoutTemplate, Plug, Wrench, MonitorSmartphone, Building2, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: <Code2 size={28} />,
    title: "Java Full Stack Development",
    desc: "Enterprise-grade Spring Boot microservices paired with modern React frontends. Robust, scalable, secure.",
    tags: ["Spring Boot", "React", "JPA"],
    link: "/services/java-full-stack"
  },
  {
    icon: <LayoutTemplate size={28} />,
    title: "Web Application Development",
    desc: "High-performance Progressive Web Apps and SPAs built with modern JavaScript ecosystems.",
    tags: ["React", "Next.js", "Node.js"],
    link: "/services/web-applications"
  },
  {
    icon: <Cpu size={28} />,
    title: "Custom Software Solutions",
    desc: "Precision-engineered bespoke software tailored to your unique business logic and operational needs.",
    tags: ["Agile", "REST API", "Microservices"],
    link: "/services/custom-software"
  },
  {
    icon: <Cloud size={28} />,
    title: "UI/UX Design Support",
    desc: "Human-centered, research-backed design systems creating stunning, conversion-optimized user experiences.",
    tags: ["Figma", "Prototyping", "A/B Testing"],
    link: "/services/ui-ux-design"
  },
  {
    icon: <Plug size={28} />,
    title: "API Integration Services",
    desc: "Seamless third-party data bridges and robust middleware connecting your entire technology ecosystem.",
    tags: ["REST", "GraphQL", "OAuth2"],
    link: "/services/api-integration"
  },
  {
    icon: <Wrench size={28} />,
    title: "Maintenance & Support",
    desc: "24/7 monitoring, proactive security patching, and continuous performance tuning for zero downtime.",
    tags: ["SLA-backed", "CI/CD", "Uptime"],
    link: "/services/maintenance-support"
  },
  {
    icon: <MonitorSmartphone size={28} />,
    title: "Responsive Website Development",
    desc: "Mobile-first responsive experiences optimized for every device, from 320px to 4K ultra-wide viewports.",
    tags: ["Mobile-first", "WCAG 2.1", "Core Web Vitals"],
    link: "/services/responsive-development"
  },
  {
    icon: <Building2 size={28} />,
    title: "Business Portal Development",
    desc: "Secure, role-based enterprise portals with real-time dashboards, reporting, and workflow automations.",
    tags: ["Dashboard", "RBAC", "Real-time"],
    link: "/services/business-portals"
  }
];

const Services = () => {
  return (
    <section className="services-section">
      <div className="section-header">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ⚡ What We Build
        </motion.span>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Core <span className="gradient-text">Capabilities</span>
        </motion.h2>
        <motion.p
          className="section-desc"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Combining technical excellence with strategic vision to deliver transformative digital experiences at enterprise scale.
        </motion.p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="service-card"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            <TiltCard>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <div className="tag-strip">
                {service.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
              <div className="card-arrow">
                <span>Explore Service</span>
                <ArrowRight size={14} />
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
