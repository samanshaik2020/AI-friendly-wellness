
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun, Menu, X, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-amber-100' 
        : 'bg-white/80 backdrop-blur-md shadow-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`bg-gradient-to-br from-amber-400 to-orange-500 p-2.5 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
              isScrolled ? 'glow-effect' : ''
            }`}>
              <Sun className="h-6 w-6 text-white animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
              Dr. Helio Cares
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="#features" 
              className="text-gray-700 hover:text-amber-600 transition-all duration-300 font-medium relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="#testimonials" 
              className="text-gray-700 hover:text-amber-600 transition-all duration-300 font-medium relative group"
            >
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="#faq" 
              className="text-gray-700 hover:text-amber-600 transition-all duration-300 font-medium relative group"
            >
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/onboarding">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-6 py-2.5 font-semibold shadow-lg hover-lift glow-effect transition-all duration-300">
                Get Started 
                <Sparkles className="ml-2 w-4 h-4" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-amber-50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4 border-t border-amber-100">
            <Link 
              to="#features" 
              className="block text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="#testimonials" 
              className="block text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              to="#faq" 
              className="block text-gray-700 hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
