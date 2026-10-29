import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactCTA = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-black rounded-[48px] p-12 md:p-24 relative overflow-hidden text-center">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px]"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[24px] flex items-center justify-center mx-auto mb-12 border border-white/10">
              <MessageSquare className="text-white w-10 h-10" />
            </div>
            
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Ready for launch?</h2>
            <h3 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-12 leading-[1.1]">
              Let's engineer your <br />
              next <span className="text-gray-500 text-6xl md:text-9xl block mt-2">Success.</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-white text-black px-12 py-6 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center group"
              >
                Inquire Project
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <a 
                href="mailto:hello@imtiazcreative.com"
                className="text-white font-black text-xs uppercase tracking-[0.2em] hover:text-gray-400 transition-colors flex items-center"
              >
                <Mail size={16} className="mr-3 text-gray-500" />
                hello@imtiazcreative.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
