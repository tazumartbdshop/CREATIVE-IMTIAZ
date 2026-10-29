import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Terminal, Cpu } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types';

export const AboutSection = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 shadow-2xl relative group">
              <img 
                src={profile?.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000"} 
                alt="Profile" 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                <p className="text-white text-xs font-black uppercase tracking-[0.2em]">Imtiaz Khan - Principal Developer</p>
              </div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-10 -right-10 bg-black text-white p-10 rounded-[32px] hidden xl:block shadow-2xl">
              <div className="flex items-center space-x-4 mb-4">
                <Terminal size={20} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Experience</span>
              </div>
              <p className="text-5xl font-black mb-2 tracking-tighter">05+</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Years in Digital Production</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-8 flex items-center">
              <User size={14} className="mr-3" />
              THE BRAND ARCHITECT
            </h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-8 leading-tight">
              ABOUT <span className="text-gray-400">IMTIAZ CREATIVE.</span>
            </h3>
            
            <p className="text-lg text-gray-600 font-medium leading-relaxed mb-8">
              {profile?.bio || "I build modern and responsive websites that help businesses, brands, and creators establish a professional digital presence."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-900">Custom E-commerce</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-900">Enterprise SaaS</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-900">Digital Strategy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-900">UX Architecture</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-8">
              <Link 
                to="/contact"
                className="bg-black text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10 flex items-center"
              >
                Connect Now
                <ArrowRight className="ml-3 w-4 h-4" />
              </Link>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400">
                  <Cpu size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Tech Stack</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Supabase • React • Node</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
