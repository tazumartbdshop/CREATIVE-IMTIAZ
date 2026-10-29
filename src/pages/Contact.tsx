import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Terminal, MessageSquare, Briefcase, Globe, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';

import { SEO } from '../components/SEO';

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_requested: 'General Professional Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    
    const { error } = await supabase
      .from('contact_messages')
      .insert([
        { 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_requested: formData.service_requested,
          message: formData.message,
          status: 'new'
        }
      ]);

    if (error) {
      console.error('Error sending message:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 3000);
    } else {
      setFormState('success');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Contact Terminal" 
        description="Initialize a secure connection with IMTIAZ CREATIVE to discuss your next digital engineering project." 
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
              <MessageSquare size={14} className="text-gray-400" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Secure Channel</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 leading-none mb-10 tracking-tighter">
              START YOUR <br />
              <span className="text-gray-400">PROJECT.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-3xl leading-relaxed font-medium">
              Ready to facilitate your digital transformation? Reach out for a strategic consultation on your next high-performance web engineering project.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            {/* Contact Info */}
            <div className="space-y-16">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-10 flex items-center">
                  <div className="w-8 h-px bg-gray-200 mr-4"></div>
                  Direct Terminals
                </h3>
                <div className="space-y-12">
                  <div className="flex items-start space-x-8 group">
                    <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Electronic Correspondence</p>
                      <a href="mailto:hello@imtiazcreative.com" className="text-2xl font-black text-gray-900 hover:text-gray-500 transition-colors tracking-tight">
                        hello@imtiazcreative.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-8 group">
                    <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Voice Interface</p>
                      <p className="text-2xl font-black text-gray-900 tracking-tight">+880 1234 567890</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-8 group">
                    <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Global HQ</p>
                      <p className="text-2xl font-black text-gray-900 tracking-tight">Dhaka, Bangladesh <br /> <span className="text-gray-400">Remote Worldwide</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400 mb-8 flex items-center">
                  <div className="w-8 h-px bg-gray-200 mr-4"></div>
                  Trust & Compliance
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                    <ShieldCheck size={24} className="mb-4 text-black" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">Secure Protocol</p>
                    <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mt-1">Encrypted Data</p>
                  </div>
                  <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                    <Zap size={24} className="mb-4 text-black" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-900">Instant Triage</p>
                    <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mt-1">24hr Response</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-gray-100 p-8 md:p-16 rounded-[40px] shadow-2xl shadow-black/5 relative overflow-hidden">
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-8 shadow-xl shadow-black/20">
                    <CheckCircle2 className="text-white" size={40} />
                  </div>
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter">INTEL RECEIVED</h3>
                  <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs mx-auto">
                    Your project inquiry has been successfully transmitted to our engineering team. We will review and respond within 24 hours.
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="mt-12 text-[10px] font-black uppercase tracking-widest text-black border-b-2 border-black pb-1 hover:opacity-50 transition-opacity"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Identity</label>
                      <input 
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text" 
                        placeholder="e.g. Johnathan Doe"
                        className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-1 focus:ring-black text-xs font-bold transition-all placeholder:text-gray-300"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Terminal</label>
                      <input 
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        placeholder="e.g. john@domain.com"
                        className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-1 focus:ring-black text-xs font-bold transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Project Category</label>
                      <div className="relative">
                        <select 
                          name="service_requested"
                          value={formData.service_requested}
                          onChange={handleChange}
                          className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-1 focus:ring-black text-xs font-bold transition-all appearance-none cursor-pointer"
                        >
                          <option>General Professional Inquiry</option>
                          <option>High-Performance E-commerce</option>
                          <option>Corporate Digital Strategy</option>
                          <option>SaaS Architectural Design</option>
                        </select>
                        <Briefcase size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone (Optional)</label>
                      <input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="text" 
                        placeholder="e.g. +1 234 567 890"
                        className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-1 focus:ring-black text-xs font-bold transition-all placeholder:text-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Brief Intelligence Description</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your digital goals, constraints, and timeline..."
                      className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-1 focus:ring-black text-xs font-bold transition-all resize-none placeholder:text-gray-300"
                    ></textarea>
                  </div>

                  <button 
                    disabled={formState === 'loading'}
                    className="w-full bg-black text-white py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-gray-800 transition-all disabled:opacity-50 group shadow-xl shadow-black/20"
                  >
                    {formState === 'loading' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        INITIALIZE CONNECTION
                        <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                      </>
                    )}
                  </button>
                  {formState === 'error' && (
                    <p className="text-center text-[9px] font-black text-red-500 uppercase tracking-widest">
                      Transmission Error. Please try again or use direct email.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
