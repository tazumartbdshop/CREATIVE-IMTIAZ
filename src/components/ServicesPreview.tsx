import React, { useEffect, useState } from 'react';
import { LayoutGrid, ShoppingCart, Smartphone, Globe, Search, Zap, ArrowRight, ShieldCheck, Palette, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Service } from '../types';

const iconMap: Record<string, any> = {
  ShoppingCart,
  ShieldCheck,
  Zap,
  Palette,
  Search,
  Smartphone,
  LayoutGrid,
  Globe,
  Code2
};

export const ServicesPreview = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true })
        .limit(6);

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading) return null;

  return (
    <section className="py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-6">Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              WHAT I <span className="text-gray-400">BUILD.</span>
            </h3>
          </div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] max-w-xs leading-relaxed">
            Specialized technical solutions designed to bridge the gap between complex business needs and intuitive user experiences.
          </p>
        </div>

        {/* Categories Container with Mobile Horizontal Scroll */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-12 lg:pb-0 lg:grid lg:grid-cols-3 lg:gap-0 lg:border-t lg:border-l border-gray-100 no-scrollbar">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon_name] || Zap;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-[85vw] sm:w-[350px] lg:w-auto p-10 lg:p-12 border border-gray-100 lg:border-t-0 lg:border-l-0 lg:border-r lg:border-b hover:bg-gray-50 transition-all group relative mr-4 lg:mr-0 rounded-3xl lg:rounded-none shadow-xl shadow-black/5 lg:shadow-none bg-white lg:bg-transparent"
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-10 bg-white border border-gray-100 text-gray-900 group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider">{service.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-10 font-medium">
                      {service.description}
                    </p>
                    <Link 
                      to="/contact" 
                      className="text-[10px] font-black uppercase tracking-widest text-black flex items-center group/link"
                    >
                      Learn Strategy 
                      <ArrowRight className="ml-3 w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                  
                  {/* Decorative Pattern */}
                  <div className="absolute -bottom-4 -right-4 text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon size={120} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

