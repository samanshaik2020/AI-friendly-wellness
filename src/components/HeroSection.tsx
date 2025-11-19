import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import DrHelioIntro from './DrHelioIntro';
import DrHelioVisual from './DrHelioVisual';

const HeroSection: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenIntroThisSession = sessionStorage.getItem('hasSeenDrHelioIntro');
    if (hasSeenIntroThisSession) {
      setShowIntro(false);
      setIsVisible(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIsVisible(true);
    sessionStorage.setItem('hasSeenDrHelioIntro', 'true');
  };

  return (
    <>
      {showIntro && <DrHelioIntro onIntroComplete={handleIntroComplete} />}
      <div className={`relative min-h-screen pt-24 pb-16 overflow-hidden bg-gradient-to-br from-amber-50/50 via-white to-orange-50/50 ${!isVisible ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>

        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-amber-100/20 to-orange-100/20 rounded-full blur-3xl opacity-50 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-100/20 to-amber-100/20 rounded-full blur-3xl opacity-50 translate-y-1/3"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]"></div>
        </div>

        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center min-h-[calc(100vh-100px)] relative z-10">
          {/* Left content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <div className="fade-in-left space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-md border border-amber-100 rounded-full text-amber-800 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-300">
                <span className="flex h-2 w-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                AI-Powered Healthcare Companion
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-gray-900">
                Healthcare <br />
                Reimagined with <br />
                <span className="gradient-text relative inline-block">
                  Intelligence
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>

              <p className="text-gray-600 text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience the future of personal health assistance.
                <span className="font-semibold text-gray-800"> Dr. Helio</span> combines advanced AI with compassionate care to provide instant, reliable medical guidance 24/7.
              </p>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start pt-4">
                <Link to="/onboarding" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                    Start Consultation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg font-semibold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                  View Features
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-8 pt-8 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-gray-500">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium">HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium">24/7 Available</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span className="text-sm font-medium">98% Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - New Visual */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative fade-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl transform scale-110"></div>
              <DrHelioVisual />

              {/* Floating Cards */}
              <div className="absolute -left-12 top-1/4 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 animate-[float_6s_ease-in-out_infinite_2s] hidden md:block">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Security Status</p>
                    <p className="text-sm font-bold text-gray-800">Protected</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-8 bottom-1/4 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 animate-[float_7s_ease-in-out_infinite_1s] hidden md:block">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Response Time</p>
                    <p className="text-sm font-bold text-gray-800">&lt; 1 Second</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;