import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield } from 'lucide-react';
import DrHelioIntro from './DrHelioIntro';

const HeroSection: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Check if user has seen the intro in this session
  useEffect(() => {
    const hasSeenIntroThisSession = sessionStorage.getItem('hasSeenDrHelioIntro');
    if (hasSeenIntroThisSession) {
      setShowIntro(false);
      setHasSeenIntro(true);
      setIsVisible(true);
    }
  }, []);
  
  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    setIsVisible(true);
    sessionStorage.setItem('hasSeenDrHelioIntro', 'true');
  };

  return (
    <>
      {showIntro && <DrHelioIntro onIntroComplete={handleIntroComplete} />}
      <div className={`relative min-h-screen pt-20 pb-16 overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 ${!isVisible ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="particle float-animation" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 12 + 8}px`,
                height: `${Math.random() * 12 + 8}px`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }} 
            />
          ))}
          
          {/* Morphing background blobs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full morphing-blob opacity-60"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-yellow-200/30 to-amber-200/30 rounded-full morphing-blob opacity-40" style={{animationDelay: '2s'}}></div>
          
          {/* Floating icons */}
          <div className="absolute top-1/4 left-1/4 animate-bounce" style={{animationDelay: '1s'}}>
            <Sparkles className="w-6 h-6 text-amber-400/60" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-bounce" style={{animationDelay: '2s'}}>
            <Heart className="w-8 h-8 text-red-400/60" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-bounce" style={{animationDelay: '3s'}}>
            <Shield className="w-7 h-7 text-green-400/60" />
          </div>
        </div>

        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center min-h-screen">
          {/* Left content */}
          <div className="lg:w-1/2 text-center lg:text-left z-10 mb-10 lg:mb-0">
            <div className="fade-in-left">
              <div className="inline-flex items-center px-4 py-2 bg-amber-100/80 rounded-full text-amber-800 text-sm font-medium mb-6 glow-effect">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Healthcare Assistant
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Your Personal <br />
                <span className="gradient-text text-shadow-glow">Healthcare</span><br />
                <span className="gradient-text text-shadow-glow">Companion</span>
              </h1>
              
              <p className="text-amber-700/80 text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Meet <strong>Dr. Helio</strong>, your sunshine healthcare companion designed to provide 
                bright health information, answer medical questions, and bring 
                warmth to your wellbeing <em>anytime, anywhere</em>.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start">
                <Link to="/onboarding">
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-10 py-7 text-lg font-semibold pulse-animation glow-effect hover-lift shadow-lg">
                    Start Chatting
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" className="rounded-full px-10 py-7 text-lg font-semibold border-2 border-amber-300 text-amber-700 hover:bg-amber-50 hover-lift">
                  Learn More
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-8 mt-12 text-sm text-amber-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>AI-Powered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Enhanced Dr. Helio */}
          <div className="lg:w-1/2 relative fade-in-right">
            <div className="w-full h-[500px] flex items-center justify-center">
              <div className="relative w-[400px] h-[400px] flex items-center justify-center">
                
                {/* Enhanced background with multiple glows */}
                <div className="absolute w-[380px] h-[380px] bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100 rounded-full opacity-60 shadow-2xl morphing-blob"></div>
                <div className="absolute w-[320px] h-[320px] bg-gradient-to-tr from-amber-200/50 to-orange-200/50 rounded-full shadow-xl morphing-blob" style={{animationDelay: '1s'}}></div>
                
                {/* Professional Dr. Helio character - Enhanced */}
                <div className="relative w-[280px] h-[320px] flex flex-col items-center justify-center z-10 scale-in">
                  
                  {/* Doctor coat with better styling */}
                  <div className="absolute top-[80px] w-[220px] h-[220px] bg-white rounded-2xl shadow-lg border border-gray-100 hover-lift"></div>
                  
                  {/* Head with enhanced appearance */}
                  <div className="absolute top-0 w-[120px] h-[120px] bg-gradient-to-b from-amber-50 to-amber-100 rounded-full border-3 border-amber-200 shadow-lg overflow-hidden glow-effect">
                    {/* Animated sun rays in background */}
                    <div className="absolute inset-0 bg-gradient-radial from-amber-300/40 to-transparent animate-pulse"></div>
                    
                    {/* Professional hairstyle */}
                    <div className="absolute top-0 left-0 right-0 h-[40px] bg-gradient-to-b from-amber-800 to-amber-700 rounded-t-full"></div>
                  </div>
                  
                  {/* Enhanced professional glasses */}
                  <div className="absolute top-[75px] w-[90px] h-[25px] flex justify-center items-center z-20">
                    <div className="w-[90px] h-[3px] bg-gray-800 flex justify-between px-[8px] rounded-full">
                      <div className="w-[28px] h-[28px] bg-transparent border-[2px] border-gray-800 rounded-full shadow-sm"></div>
                      <div className="w-[28px] h-[28px] bg-transparent border-[2px] border-gray-800 rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced stethoscope */}
                  <div className="absolute top-[140px] w-[160px] h-[80px]">
                    <div className="absolute top-0 left-[40px] w-[90px] h-[3px] bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-sm"></div>
                    <div className="absolute top-0 left-[40px] w-[3px] h-[40px] bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
                    <div className="absolute top-[40px] left-[28px] w-[28px] h-[28px] bg-gradient-to-br from-amber-400 to-amber-500 border-3 border-amber-600 rounded-full shadow-md glow-effect"></div>
                  </div>
                  
                  {/* Enhanced name badge */}
                  <div className="absolute top-[180px] right-[40px] w-[60px] h-[25px] bg-gradient-to-r from-amber-100 to-amber-50 border-2 border-amber-300 rounded-lg flex items-center justify-center shadow-sm">
                    <div className="w-[45px] h-[3px] bg-amber-700 rounded-full"></div>
                  </div>
                  
                  {/* Professional smile */}
                  <div className="absolute top-[95px] w-[45px] h-[12px] border-b-[3px] border-amber-700 rounded-full z-20"></div>
                  
                  {/* Enhanced sun icon as a pin/badge */}
                  <div className="absolute top-[130px] left-[50px] w-[32px] h-[32px] bg-gradient-to-br from-amber-400 to-amber-500 rounded-full border-3 border-amber-600 flex items-center justify-center z-30 shadow-lg glow-effect animate-pulse">
                    <div className="w-[20px] h-[20px] bg-gradient-to-br from-amber-300 to-amber-400 rounded-full"></div>
                  </div>
                  
                  {/* Floating medical icons around Dr. Helio */}
                  <div className="absolute -top-5 -left-5 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shadow-md bounce-in" style={{animationDelay: '0.5s'}}>
                    <Heart className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="absolute -top-5 -right-5 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shadow-md bounce-in" style={{animationDelay: '1s'}}>
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shadow-md bounce-in" style={{animationDelay: '1.5s'}}>
                    <Sparkles className="w-4 h-4 text-purple-600" />
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