import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  Briefcase,
  ExternalLink,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types';

import { SEO } from '../components/SEO';

const About = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="About Identity" 
        description="Learn about IMTIAZ CREATIVE, our mission to redefine the digital frontier through specialized engineering and strategic design." 
      />
      {/* Brand Identity */}
      <section className="pt-40 pb-20 border-b border-gray-100 bg-gray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm mb-8">
                <Terminal size={14} className="text-gray-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Company Identity</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-none mb-10 tracking-tighter">
                IMTIAZ <br />
                <span className="text-gray-400">CREATIVE.</span>
              </h1>
              <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
                {profile?.bio || "Architecting high-performance digital experiences for forward-thinking brands across the globe."}
              </p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Globe size={18} />
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Dhaka <br /> Bangladesh</div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center text-black shadow-sm">
                    <Briefcase size={18} />
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-gray-400">Available <br /> Worldwide</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gray-50 rounded-[40px] overflow-hidden border border-gray-100 shadow-2xl relative z-10">
                <img 
                  src={profile?.avatar_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"} 
                  alt="Imtiaz Khan" 
                  className="w-full h-full object-cover grayscale opacity-90"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-black text-white p-12 rounded-[32px] hidden xl:block shadow-2xl z-20">
                <p className="text-5xl font-black mb-2 tracking-tighter">50+</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Deployments</p>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-gray-100 rounded-full blur-[100px] opacity-50"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { title: 'Global Delivery', icon: Shield, desc: 'Facilitating international business growth with high-performance digital architecture.' },
              { title: 'Scale First', icon: Zap, desc: 'Engineering systems with React and Supabase for absolute speed and future scalability.' },
              { title: 'Precision Code', icon: Cpu, desc: 'Obsessive attention to typographic rhythm, spacing, and clean code standards.' },
              { title: 'Growth Focused', icon: Users, desc: 'Direct consultation on digital strategy to ensure your product outperforms the market.' }
            ].map((value, i) => (
              <div key={i} className="group">
                <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white group-hover:scale-110 transition-all shadow-sm">
                  <value.icon size={24} />
                </div>
                <h3 className="text-lg font-black uppercase tracking-wider mb-4">{value.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Mission */}
      <section className="py-24 border-y border-gray-100 bg-gray-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Our Mission</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight uppercase">
              REDEFINING THE <br />
              <span className="text-gray-400">DIGITAL FRONTIER.</span>
            </h3>
          </div>
          <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed text-center">
            <p className="mb-8">
              At IMTIAZ CREATIVE, we believe that a website is more than just a digital placeholder. It is a high-performance engine designed to drive business growth, facilitate user engagement, and establish market authority.
            </p>
            <p className="mb-8">
              Based in Dhaka, Bangladesh, we operate with a global perspective, delivering specialized engineering solutions to clients across North America, Europe, and Asia. Our approach combines rigorous technical intelligence with a deep understanding of international design standards.
            </p>
            <div className="flex justify-center space-x-6 pt-8">
              <a href={profile?.github_url || "#"} className="text-gray-400 hover:text-black transition-colors"><Github size={24} /></a>
              <a href={profile?.linkedin_url || "#"} className="text-gray-400 hover:text-black transition-colors"><Linkedin size={24} /></a>
              <a href={profile?.twitter_url || "#"} className="text-gray-400 hover:text-black transition-colors"><Twitter size={24} /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Successful Launches', val: '50+' },
              { label: 'Global Clients', val: '20+' },
              { label: 'Performance Score', val: '98%' },
              { label: 'Years Intelligence', val: '04' }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">{stat.val}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
