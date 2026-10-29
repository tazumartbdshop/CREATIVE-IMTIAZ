import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Globe, ArrowLeft, Terminal, Cpu, CheckCircle2, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';

import { SEO } from '../components/SEO';

const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (!error && data) {
        setProject(data);
      }
      setLoading(false);
    };
    fetchProject();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  );

  if (!project) return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center space-y-6">
      <h2 className="text-2xl font-black uppercase tracking-widest text-gray-400">Project Not Found</h2>
      <Link to="/projects" className="bg-black text-white px-8 py-3 rounded text-[10px] font-bold uppercase tracking-widest">Back to Showcase</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={project.title} 
        description={project.description.slice(0, 160)} 
      />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/projects" className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Showcase</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm mb-6">
                <Terminal size={14} className="text-gray-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">{project.category}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-none mb-8 tracking-tighter">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-10">
                {project.technologies.map(tech => (
                  <div key={tech} className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded text-[9px] font-black uppercase tracking-widest">
                    <Cpu size={12} className="text-gray-400" />
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                {project.demo_url && (
                  <a 
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-10 py-5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10 flex items-center"
                  >
                    Launch Live Reveal
                    <Globe size={16} className="ml-3" />
                  </a>
                )}
                <Link 
                  to="/contact"
                  className="bg-white text-black border border-gray-100 px-10 py-5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center shadow-sm"
                >
                  Request Analysis
                  <MessageSquare size={16} className="ml-3" />
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[16/10] bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden"
            >
              <img 
                src={project.thumbnail_url} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
            <div className="lg:col-span-2 space-y-16">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.25em] text-gray-400 mb-8 flex items-center">
                  <div className="w-8 h-px bg-gray-200 mr-4"></div>
                  Executive Summary
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 font-medium leading-relaxed">
                  {project.description.split('\n').map((para, i) => (
                    <p key={i} className="mb-6">{para}</p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.25em] text-gray-400 mb-10 flex items-center">
                  <div className="w-8 h-px bg-gray-200 mr-4"></div>
                  Core Architecture
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['High-Performance Load Optimization', 'Scalable Cloud Infrastructure', 'Intuitive UI Logic', 'Advanced Security Protocols'].map(feature => (
                    <div key={feature} className="p-6 bg-gray-50 border border-gray-100 rounded-2xl flex items-center space-x-4">
                      <CheckCircle2 size={24} className="text-black" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-10">
                <div className="bg-black text-white p-10 rounded-[32px] shadow-2xl">
                  <h4 className="text-xl font-black mb-6">Start a Project <br /> Similar to This</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-10 leading-relaxed">
                    Facilitating digital transformation through specialized engineering and strategic design.
                  </p>
                  <Link 
                    to="/contact"
                    className="block w-full bg-white text-black py-5 rounded-2xl text-center text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                  >
                    Begin Inquiry
                  </Link>
                </div>

                <div className="p-10 border border-gray-100 rounded-[32px] bg-white shadow-sm">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Engineering Specs</h4>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">Production Ready</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Architecture</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">Modern Full-Stack</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Compliance</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">International Standards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
