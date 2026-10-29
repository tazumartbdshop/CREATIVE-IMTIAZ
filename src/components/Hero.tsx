import React from 'react';
import { motion } from 'motion/react';
import { Code2, Globe, Cpu } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative w-full pt-20 overflow-hidden bg-white">
      <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden bg-black">
        {/* Professional Developer Visual Background */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000" 
            alt="Digital Connectivity" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Decorative Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                  <Globe size={14} />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                  <Cpu size={14} />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                  <Code2 size={14} />
                </div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">
                Architecting Global Experiences
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-none mb-6 tracking-tight">
              Engineering <span className="text-gray-500">Digital</span> <br />
              Performance.
            </h1>

            <p className="text-xs md:text-sm text-gray-400 max-w-md leading-relaxed font-bold uppercase tracking-widest">
              Professional Full-Stack Development & Strategic Digital Solutions for the Modern International Market.
            </p>
          </motion.div>
        </div>

        {/* Moving Lines/Patterns for Tech Feel */}
        <div className="absolute right-0 bottom-0 w-1/3 h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 h-full gap-2">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -100, 0] }}
                transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                className="w-px h-full bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

