import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, ArrowLeft, Terminal, Share2, Bookmark, Clock, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types';
import Markdown from 'react-markdown';

import { SEO } from '../components/SEO';

const BlogPostDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (!error && data) {
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center space-y-6">
      <h2 className="text-2xl font-black uppercase tracking-widest text-gray-400">Article Not Found</h2>
      <Link to="/blog" className="bg-black text-white px-8 py-3 rounded text-[10px] font-bold uppercase tracking-widest">Back to Journal</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={post.title} 
        description={post.excerpt} 
      />
      {/* Article Hero */}
      <section className="relative pt-40 pb-20 border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-12 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Knowledge Terminal</span>
          </Link>

          <div className="flex items-center space-x-4 mb-8">
            <span className="bg-black text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
              {post.category}
            </span>
            <div className="w-1 h-1 rounded-full bg-gray-300"></div>
            <div className="flex items-center space-x-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              <Clock size={12} />
              <span>8 min read</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-12 tracking-tighter">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-8 border-y border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Author" className="w-full h-full object-cover grayscale" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-widest leading-none mb-1">Imtiaz Khan</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Lead Strategist</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-black hover:border-gray-200 transition-all shadow-sm">
                <Share2 size={18} />
              </button>
              <button className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-black hover:border-gray-200 transition-all shadow-sm">
                <Bookmark size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 bg-gray-50"
          >
            <img 
              src={post.cover_image} 
              alt={post.title}
              className="w-full h-full object-cover grayscale opacity-90"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-gray-700 font-medium leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-black prose-strong:text-gray-900">
            <Markdown>{post.content}</Markdown>
          </div>

          <div className="mt-20 pt-12 border-t border-gray-100">
            <div className="bg-gray-50 rounded-[40px] p-12 text-center">
              <Terminal size={40} className="mx-auto mb-8 text-gray-300" />
              <h4 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tighter">WAS THIS INSIGHT VALUABLE?</h4>
              <p className="text-sm text-gray-500 font-medium mb-10 max-w-md mx-auto leading-relaxed">
                Our Knowledge Terminal is designed to facilitate international growth through specialized technical intelligence.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/contact" className="bg-black text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
                  Discuss Strategy
                </Link>
                <Link to="/blog" className="bg-white text-black border border-gray-100 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                  More Analysis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPostDetails;
