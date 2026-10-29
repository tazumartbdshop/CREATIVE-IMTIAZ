import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Search, Tag } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types';

export const BlogPreview = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return null;

  return (
    <section className="py-24 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-6">Knowledge Base</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              INSIGHTS & <span className="text-gray-400">ARTICLES.</span>
            </h3>
          </div>
          <Link to="/blog" className="text-[10px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-1 hover:opacity-50 transition-all w-fit">
            View All Insights
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <img 
                    src={post.cover_image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-gray-900 text-white px-3 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                      <Calendar size={12} className="mr-2" />
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-gray-500 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2 font-medium">
                    {post.excerpt}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-black group/link"
                  >
                    Read Perspective
                    <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden lg:block space-y-12">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center">
                <Search size={14} className="mr-3" />
                Explore Journal
              </h4>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search insights..." 
                  className="w-full bg-white border border-gray-100 rounded-xl px-5 py-3 text-xs outline-none focus:ring-1 focus:ring-black transition-all"
                />
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center">
                <Tag size={14} className="mr-3" />
                Cloud Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Development', 'UI Design', 'Architecture', 'Business', 'Performance', 'Growth'].map(tag => (
                  <button key={tag} className="px-3 py-1.5 bg-white border border-gray-100 rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-black rounded-3xl p-8 text-white">
              <h4 className="text-xl font-black mb-4">Weekly <br /> Insights</h4>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-relaxed mb-6">
                Subscribe to get the latest digital trends in your inbox.
              </p>
              <input 
                type="email" 
                placeholder="email@domain.com" 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3 text-xs outline-none focus:ring-1 focus:ring-white mb-4"
              />
              <button className="w-full bg-white text-black py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
