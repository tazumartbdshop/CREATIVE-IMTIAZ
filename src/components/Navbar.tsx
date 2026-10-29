import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code2, Newspaper, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md py-3 border-b border-gray-100 shadow-sm'
          : 'bg-white py-5 border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Mobile Hamburger */}
            <button
              className="p-2 -ml-2 text-gray-600 hover:text-black transition-colors md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Brand */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center transition-transform group-hover:scale-105">
                <Code2 className="text-white w-5 h-5" />
              </div>
              <span className="font-black text-lg tracking-tight text-gray-900 leading-none">
                IMTIAZ <span className="text-gray-400">CREATIVE</span>
              </span>
            </Link>

            {/* Article Access - Visible on all screens */}
            <div className="h-6 w-px bg-gray-100 mx-2 hidden sm:block"></div>
            <Link
              to="/blog"
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-all group"
            >
              <Newspaper size={14} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden xs:block">Articles</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-black relative',
                    location.pathname === link.href
                      ? 'text-black'
                      : 'text-gray-400'
                  )}
                >
                  {link.name}
                  {location.pathname === link.href && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                    />
                  )}
                </Link>
              ))}
            </div>
            
            <Link
              to="/contact"
              className="flex items-center space-x-2 bg-black text-white px-5 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/5"
            >
              <span>Inquire</span>
              <ChevronRight size={12} />
            </Link>
          </div>

          {/* Mobile Right Action */}
          <div className="md:hidden">
            <Link
              to="/contact"
              className="bg-black text-white px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-10 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    'block text-sm font-black uppercase tracking-[0.2em] transition-colors',
                    location.pathname === link.href
                      ? 'text-black'
                      : 'text-gray-400'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-50">
                <Link
                  to="/blog"
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <Newspaper size={18} className="text-gray-400" />
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-900">Articles & Insights</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

