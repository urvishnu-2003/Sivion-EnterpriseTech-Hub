import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Layers } from 'lucide-react';

const HorizontalShowcase = ({ projects }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate horizontal movement
  // Assuming 4 featured projects, we move to -75% (or based on dynamic calculation)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#050d1a]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Section Heading (Pinned) */}
        <div className="absolute top-20 left-12 z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
             <span className="text-cyan-400 text-[10px] font-black tracking-[0.5em] uppercase block mb-4">The Showcase</span>
             <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                Featured <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Successes</span>
             </h2>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
          {projects.map((project, i) => (
            <div key={project.id} className="relative group flex-shrink-0 w-[85vw] md:w-[60vw]">
              <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 bg-[#0a1628] shadow-2xl group/card">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(circle at center, cyan 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                
                <div className="absolute inset-0 p-12 flex flex-col justify-between">
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-cyan-400 text-[10px] font-black uppercase tracking-widest bg-cyan-400/10 px-3 py-1 rounded-full w-fit mb-2">
                        {project.industry}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        {project.title}
                      </h3>
                    </div>
                    <div className="text-4xl font-black text-white/5 font-mono">0{i + 1}</div>
                  </div>

                  {/* Center Content */}
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <p className="text-slate-400 text-lg leading-relaxed line-clamp-3 mb-8 italic border-l-2 border-cyan-400/30 pl-6">
                        "{project.problem}"
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((t, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-slate-500 uppercase">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="hidden md:grid grid-cols-2 gap-4">
                      {project.measurableImpact.map((impact, idx) => (
                        <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                          <div className="text-cyan-400 text-2xl font-black">{impact.value}</div>
                          <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{impact.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <Link to={`/projects/${project.id}`} className="group/btn flex items-center gap-3 text-white font-black uppercase text-xs tracking-widest hover:text-cyan-400 transition-colors">
                      Explore Case Study 
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-cyan-400 group-hover/btn:text-navy transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                    
                    <div className="flex gap-6 opacity-40">
                       <Zap className="w-4 h-4" />
                       <Target className="w-4 h-4" />
                       <Layers className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Hover States */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          ))}

          {/* End of Carousel CTA */}
          <div className="flex-shrink-0 w-[40vw] flex items-center justify-center pr-24">
            <div className="text-center group">
              <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center mb-8 mx-auto group-hover:border-cyan-400 transition-all cursor-pointer">
                <ArrowRight className="w-12 h-12 text-white/20 group-hover:text-cyan-400 transition-all group-hover:translate-x-2" />
              </div>
              <h3 className="text-white font-black text-2xl uppercase tracking-tighter">Explore All <br/> <span className="text-cyan-400">Industries</span></h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalShowcase;
