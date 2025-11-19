import React from 'react';
import { Sun, Heart, Shield, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden pt-24 pb-12">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand section */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2.5 rounded-xl shadow-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Dr. Helio
              </span>
            </div>

            <p className="text-gray-400 mb-8 max-w-md leading-relaxed text-lg">
              Your intelligent healthcare companion. We combine advanced AI with human-centric design to provide accessible, reliable, and compassionate care for everyone.
            </p>

            <div className="flex space-x-4">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group">
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-white">Product</h4>
            <ul className="space-y-4">
              {['Features', 'Testimonials', 'FAQ', 'Pricing'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-amber-400 transition-colors flex items-center group">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              {['About', 'Careers', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="font-bold mb-6 text-white">Stay Updated</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Subscribe to our newsletter for the latest health tips and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-l-xl focus:outline-none focus:border-amber-500 w-full transition-colors"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-r-xl transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Dr. Helio AI. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
