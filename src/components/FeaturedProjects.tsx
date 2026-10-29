import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Filter, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';
import { cn } from '../lib/utils';

export const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'E-commerce', 'SaaS', 'Portfolio', 'Web App'];

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('is_featured', true)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  if (loading) return null;

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-6">Showcase</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              FEATURED <span className="text-gray-400">PROJECTS.</span>
            </h3>
          </div>
          <Link to="/projects" className="text-[10px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-1 hover:opacity-50 transition-all w-fit">
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Sidebar Categories - Desktop Only */}
          <div className="hidden lg:block space-y-10">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8 flex items-center">
                <Filter size={14} className="mr-3" />
                Specialization
              </h4>
              <div className="flex flex-col space-y-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "text-left text-xs font-bold uppercase tracking-widest transition-all hover:translate-x-2",
                      activeCategory === cat ? "text-black translate-x-2" : "text-gray-400"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Status Terminal</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Active Production</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Development</span>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid with Mobile Scroll */}
          <div className="lg:col-span-3">
            <div className="flex overflow-x-auto pb-10 lg:pb-0 lg:grid lg:grid-cols-2 gap-8 lg:gap-10 no-scrollbar">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[85vw] sm:w-[450px] lg:w-auto group"
                >
                  <div className="relative overflow-hidden rounded-3xl aspect-[16/11] mb-8 bg-gray-50 border border-gray-100 shadow-xl shadow-black/5 transition-shadow hover:shadow-2xl">
                    <img 
                      src={project.thumbnail_url} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Link 
                        to={`/projects/${project.slug}`} 
                        className="bg-white text-black px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center"
                      >
                        Analysis
                      </Link>
                      {project.demo_url && (
                        <a 
                          href={project.demo_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-black text-white px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/20 hover:bg-gray-900 transition-all flex items-center"
                        >
                          Live Reveal
                          <Globe size={12} className="ml-2" />
                        </a>
                      )}
                    </div>

                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start px-4">
                    <div className="max-w-[80%]">
                      <h4 className="text-xl font-black text-gray-900 mb-3 group-hover:text-gray-500 transition-colors truncate">
                        {project.title}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map(tech => (
                          <span key={tech} className="text-[9px] font-black px-2 py-1 bg-gray-50 rounded border border-gray-100 text-gray-400 uppercase tracking-tight">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link 
                      to={`/projects/${project.slug}`}
                      className="w-12 h-12 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all shadow-sm"
                    >
                      <ArrowUpRight size={20} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};
