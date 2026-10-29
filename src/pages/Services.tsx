import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingCart, 
  Layout, 
  Globe, 
  Search, 
  ShieldCheck, 
  Smartphone,
  Zap,
  Palette,
  Terminal,
  Code2
} from 'lucide-react';
import { ContactCTA } from '../components/ContactCTA';
import { supabase } from '../lib/supabase';
import type { Service } from '../types';

const iconMap: Record<string, any> = {
  ShoppingCart,
  ShieldCheck,
  Zap,
  Palette,
  Search,
  Smartphone,
  Layout,
  Globe,
  Code2
};

import { SEO } from '../components/SEO';

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true });
      
      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <SEO 
        title="Capabilities Terminal" 
        description="Explore our specialized services in e-commerce architecture, SaaS engineering, and professional digital strategy." 
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
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Capabilities Terminal</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-none mb-10 tracking-tighter">
              WHAT I <span className="text-gray-400">BUILD.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl leading-relaxed font-medium">
              Comprehensive web engineering and design architecture tailored for businesses aiming for a professional, high-performance digital presence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-100">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon_name] || Zap;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="p-12 border-r border-b border-gray-100 hover:bg-gray-50 transition-colors group relative overflow-hidden"
                  >
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                        <Icon size={28} />
                      </div>
                      <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-wider leading-tight">{service.title}</h3>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{service.description}</p>
                    </div>
                    {/* Decorative Background */}
                    <div className="absolute -bottom-10 -right-10 text-gray-100/50 group-hover:text-gray-200 transition-colors pointer-events-none">
                      <Icon size={160} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
    </div>
  );
};

export default Services;
