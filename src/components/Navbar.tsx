import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun, Menu, X, Sparkles, ChevronRight } from 'lucide-react';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 py-3'
        : 'bg-transparent py-5'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={`relative p-2 rounded-xl transition-all duration-300 group-hover:scale-105 ${isScrolled ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-md' : 'bg-white/20 backdrop-blur-md border border-white/30'
              }`}>
              <Sun className={`h-6 w-6 transition-colors duration-300 ${isScrolled ? 'text-white' : 'text-amber-600'}`} />
            </div>
            <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 transition-all duration-300 ${!isScrolled && 'md:text-gray-800'
              }`}>
              Dr. Helio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {['Features', 'Testimonials', 'FAQ'].map((item) => (
              <Link
                key={item}
                to={`#${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100/50 transition-all duration-300"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/onboarding">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
                Get Started
                <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
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
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
          <div className="p-4 space-y-2">
            {['Features', 'Testimonials', 'FAQ'].map((item) => (
              <Link
                key={item}
                to={`#${item.toLowerCase()}`}
                className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
