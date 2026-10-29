import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <div className="w-10 h-10 bg-black rounded flex items-center justify-center transition-transform group-hover:scale-105">
                <Code2 className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-xl tracking-tight text-gray-900">
                IMTIAZ <span className="text-gray-400">CREATIVE</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xs font-medium">
              Architecting high-performance digital experiences for forward-thinking brands across the globe.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Mail, href: 'mailto:hello@imtiazcreative.com' }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-10 h-10 border border-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:text-black hover:border-gray-200 transition-all shadow-sm">
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-8">Expertise</h3>
            <ul className="space-y-4">
              {['Web Engineering', 'E-commerce Solutions', 'UI/UX Architecture', 'SEO Strategy', 'Digital Consultation'].map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-8">Ecosystem</h3>
            <ul className="space-y-4">
              {['About Identity', 'Work Showcase', 'Knowledge Hub', 'Client Portal', 'Legal Center'].map((link) => (
                <li key={link}>
                  <Link to={`/${link.toLowerCase().split(' ')[0]}`} className="text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-black transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 mb-8">Contact Terminal</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin size={18} className="text-gray-400 shrink-0 mt-0.5" />
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
                  Dhaka, Bangladesh <br />
                  Remote Worldwide
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Phone size={18} className="text-gray-400 shrink-0" />
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest leading-none">+880 1234 567890</p>
              </div>
              <div className="flex items-center space-x-4">
                <Mail size={18} className="text-gray-400 shrink-0" />
                <p className="text-black text-xs font-black uppercase tracking-widest leading-none">hello@imtiazcreative.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            © {currentYear} IMTIAZ CREATIVE. All rights reserved. Built with precision.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors">Terms</a>
            <a href="#" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
