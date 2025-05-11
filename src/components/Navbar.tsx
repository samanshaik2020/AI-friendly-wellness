
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <Sun className="h-6 w-6 text-amber-500" />
            </div>
            <span className="text-xl font-bold text-amber-700">Dr. Helio Cares</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
          <Link to="/onboarding">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6">
              Get Started <span className="ml-1">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
