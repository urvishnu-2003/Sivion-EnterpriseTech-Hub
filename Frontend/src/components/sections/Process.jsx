import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Search, Settings, Code2, Rocket, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discovery & Strategy",
    desc: "Deep-diving into your enterprise architecture to identify optimization vectors.",
    icon: <Search size={40} />
  },
  {
    title: "Prototyping & UX",
    desc: "Crafting modern, data-driven interfaces with performance-first design.",
    icon: <Settings size={40} />
  },
  {
    title: "Precision Engineering",
    desc: "Building scalable systems using robust tech stacks and modern methodologies.",
    icon: <Code2 size={40} />
  },
  {
    title: "Rigorous Deployment",
    desc: "Automated testing and CI/CD pipelines to ensure a flawless launch.",
    icon: <Rocket size={40} />
  },
  {
    title: "Post-Launch Growth",
    desc: "Continuous monitoring and architectural expansion for sustained success.",
    icon: <CheckCircle2 size={40} />
  }
];

const Process = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.process-step');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        start: "top top",
        end: () => "+=" + scrollRef.current.offsetWidth,
      }
    });

    // Animate progress line
    gsap.to('.progress-line-inner', {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: 1,
        start: "top top",
        end: () => "+=" + scrollRef.current.offsetWidth,
      }
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="process-wrapper">
      <div className="process-sticky-header">
        <h2>Our <span className="gradient-text">Methodology</span></h2>
        <div className="progress-line">
          <div className="progress-line-inner"></div>
        </div>
      </div>

      <div ref={scrollRef} className="process-container">
        {steps.map((step, index) => (
          <section key={index} className="process-step">
            <div className="step-content">
              <div className="step-count">0{index + 1}</div>
              <div className="step-icon-wrapper">
                {step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Process;
