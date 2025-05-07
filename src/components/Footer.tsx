
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Heart className="h-6 w-6 text-baymax-red" />
              </div>
              <span className="text-xl font-bold">Baymax Cares</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Your personal healthcare companion, designed with compassion to help you feel your best everyday.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Baymax Cares. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
