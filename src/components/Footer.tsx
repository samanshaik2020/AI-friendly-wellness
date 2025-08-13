
import React from 'react';
import { Sun, Heart, Shield, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full morphing-blob"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-full morphing-blob" style={{animationDelay: '2s'}}></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-full shadow-lg glow-effect">
                  <Sun className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Dr. Helio Cares
                </span>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Your sunshine healthcare companion, designed to brighten your health journey 
                and help you feel your best every day. Powered by advanced AI and compassionate care.
              </p>
              
              {/* Trust badges */}
              <div className="flex flex-wrap items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>24/7 Available</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all duration-300 hover-lift">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all duration-300 hover-lift">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all duration-300 hover-lift">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-700 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all duration-300 hover-lift">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#features" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    Features
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    FAQ
                  </a>
                </li>
                <li>
                  <Link to="/onboarding" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact & Legal */}
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Support & Legal</h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-amber-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    Cookie Policy
                  </a>
                </li>
              </ul>

              {/* Contact info */}
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>hello@drhelio.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>1-800-HELIO-AI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-700 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Dr. Helio Cares. All rights reserved. Made with ❤️ for better healthcare.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>🌟 Trusted by 50K+ users</span>
              <span>•</span>
              <span>🔒 HIPAA Compliant</span>
              <span>•</span>
              <span>🚀 AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
