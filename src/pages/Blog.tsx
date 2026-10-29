import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ArrowRight, Newspaper, Tag, Terminal } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types';

import { SEO } from '../components/SEO';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Knowledge Hub" 
        description="Strategic perspective on web engineering, design architecture, and digital growth for the international market." 
      />
      {/* Search Header */}
      <section className="pt-40 pb-20 border-b border-gray-100 bg-gray-50/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm mb-6">
                <Newspaper size={14} className="text-gray-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Knowledge Terminal</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-none mb-8 tracking-tighter">
                INSIGHTS & <span className="text-gray-400">ARTICLES.</span>
              </h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-lg">
                Strategic perspective on web engineering, design architecture, and digital growth for the international market.
              </p>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-[32px] shadow-2xl border border-gray-100 relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center">
                  <Search size={14} className="mr-3" />
                  Filter Knowledge
                </h4>
                <div className="relative">
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, tech, or title..." 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-xs font-bold outline-none focus:ring-1 focus:ring-black transition-all"
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-200 rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex flex-col h-full"
                >
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 bg-gray-50 border border-gray-100 shadow-xl shadow-black/5 transition-all group-hover:shadow-2xl">
                    <img 
                      src={post.cover_image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-black text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 px-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        <Calendar size={12} />
                        <span>{new Date(post.published_at).toLocaleDateString()}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                      <div className="flex items-center space-x-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        <Terminal size={12} />
                        <span>Analysis</span>
                      </div>
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-gray-500 transition-colors leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="px-4 pb-4 mt-auto">
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-[10px] font-black uppercase tracking-widest text-black group/link"
                    >
                      Analyze Full Insight
                      <ArrowRight size={14} className="ml-3 group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-black text-gray-900 mb-4">NO ARTICLES FOUND</h3>
              <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Try adjusting your filter or search query</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-24 bg-black overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-8">Newsletter</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-10 tracking-tight">
            WEEKLY <span className="text-gray-600">INTEL.</span>
          </h3>
          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-lg mx-auto mb-12 uppercase tracking-widest">
            Join 5,000+ developers and business leaders receiving high-fidelity digital strategy every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="YOUR@IDENTITY.COM" 
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white text-[10px] font-black outline-none focus:ring-1 focus:ring-white transition-all uppercase tracking-widest"
            />
            <button className="bg-white text-black px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all shadow-xl shadow-white/5">
              Secure Access
            </button>
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-900 rounded-full blur-[100px] opacity-20"></div>
      </section>
    </div>
  );
};

export default Blog;
