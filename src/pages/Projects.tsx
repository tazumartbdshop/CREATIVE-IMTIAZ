import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Search, Filter, Globe, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Project } from '../types';
import { cn } from '../lib/utils';

import { SEO } from '../components/SEO';

const categories = ['All', 'E-commerce', 'SaaS', 'Portfolio', 'Business', 'Web App'];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-white">
      <SEO 
        title="Project Archive" 
        description="A curated showcase of high-performance digital masterpieces, e-commerce platforms, and scalable SaaS solutions." 
      />
      {/* Header */}
      <section className="pt-40 pb-20 border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm mb-6">
              <Terminal size={14} className="text-gray-400" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Digital Archive</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-none mb-10 tracking-tighter">
              FEATURED <br />
              <span className="text-gray-400">PROJECTS.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl leading-relaxed font-medium">
              Explore our curated selection of high-performance digital solutions, e-commerce architectures, and scalable web applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Categories */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                    activeCategory === cat 
                      ? 'bg-black text-white shadow-lg shadow-black/10' 
                      : 'bg-transparent text-gray-400 hover:text-black hover:bg-gray-50'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search size={14} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search Archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-[32px] aspect-[16/11] mb-8 bg-gray-50 border border-gray-100 shadow-xl shadow-black/5 transition-all group-hover:shadow-2xl">
                      <img 
                        src={project.thumbnail_url} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <Link to={`/projects/${project.slug}`} className="bg-white text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                          Analysis
                        </Link>
                        {project.demo_url && (
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="bg-black text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/20 hover:bg-gray-900 transition-all flex items-center">
                            Live Reveal <Globe size={12} className="ml-2" />
                          </a>
                        )}
                      </div>
                      <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="px-4 flex justify-between items-start">
                      <div className="max-w-[80%]">
                        <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-gray-500 transition-colors leading-none truncate">
                          {project.title}
                        </h3>
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
              </AnimatePresence>
            </div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="py-32 text-center border-2 border-dashed border-gray-100 rounded-[40px] bg-gray-50/50">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full border border-gray-100 shadow-sm mb-8">
                <Search size={32} className="text-gray-300" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter">NO INTEL FOUND</h3>
              <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
