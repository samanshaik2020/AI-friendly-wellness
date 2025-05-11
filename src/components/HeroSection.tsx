import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DrHelioIntro from './DrHelioIntro';
const HeroSection: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  
  // Check if user has seen the intro in this session
  useEffect(() => {
    // Use sessionStorage instead of localStorage to show intro on each new session
    const hasSeenIntroThisSession = sessionStorage.getItem('hasSeenDrHelioIntro');
    if (hasSeenIntroThisSession) {
      setShowIntro(false);
      setHasSeenIntro(true);
    }
  }, []);
  
  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    // Store in sessionStorage to show intro again on new sessions
    sessionStorage.setItem('hasSeenDrHelioIntro', 'true');
  };
  return (
    <>
      {showIntro && <DrHelioIntro onIntroComplete={handleIntroComplete} />}
      <div className={`relative pt-24 pb-16 overflow-hidden ${!hasSeenIntro ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}`}>
      {/* Background particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(10)].map((_, i) => <div key={i} className="particle float-animation" style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        animationDelay: `${Math.random() * 5}s`
      }} />)}
      </div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left z-10 mb-10 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Personal <br />
            <span className="text-primary">Healthcare Companion</span>
          </h1>
          <p className="text-amber-700 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
            Meet Dr. Helio, your sunshine healthcare companion designed to provide
            bright health information, answer medical questions, and bring
            warmth to your wellbeing anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <Link to="/onboarding">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-lg pulse-animation">
                Start Chatting
              </Button>
            </Link>
            <Button variant="outline" className="rounded-full px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="w-full h-[400px] flex items-center justify-center">
            <div className="w-[300px] h-[300px] relative flex items-center justify-center">
              {/* Professional background glow */}
              <div className="absolute w-[280px] h-[280px] bg-gradient-to-b from-amber-100 to-amber-50 rounded-full opacity-40 shadow-xl"></div>
              
              {/* Professional Dr. Helio character */}
              <div className="relative w-[220px] h-[240px] flex flex-col items-center justify-center z-10">
                {/* Doctor coat */}
                <div className="absolute top-[60px] w-[180px] h-[180px] bg-white rounded-xl shadow-md border border-gray-100"></div>
                
                {/* Head with professional appearance */}
                <div className="absolute top-0 w-[100px] h-[100px] bg-amber-50 rounded-full border-2 border-amber-100 shadow-md overflow-hidden">
                  {/* Subtle sun rays in background */}
                  <div className="absolute inset-0 bg-gradient-radial from-amber-200 to-amber-50 opacity-30"></div>
                  
                  {/* Professional hairstyle */}
                  <div className="absolute top-0 left-0 right-0 h-[30px] bg-amber-700 rounded-t-full"></div>
                </div>
                
                {/* Professional glasses */}
                <div className="absolute top-[60px] w-[80px] h-[20px] flex justify-center items-center z-20">
                  <div className="w-[80px] h-[2px] bg-gray-700 flex justify-between px-[6px]">
                    <div className="w-[25px] h-[25px] bg-transparent border-[1.5px] border-gray-700 rounded-full"></div>
                    <div className="w-[25px] h-[25px] bg-transparent border-[1.5px] border-gray-700 rounded-full"></div>
                  </div>
                </div>
                
                {/* Stethoscope */}
                <div className="absolute top-[120px] w-[140px] h-[60px]">
                  <div className="absolute top-0 left-[30px] w-[80px] h-[2px] bg-amber-500 rounded-full"></div>
                  <div className="absolute top-0 left-[30px] w-[2px] h-[30px] bg-amber-500 rounded-full"></div>
                  <div className="absolute top-[30px] left-[20px] w-[22px] h-[22px] bg-amber-400 border-2 border-amber-500 rounded-full"></div>
                </div>
                
                {/* Name badge */}
                <div className="absolute top-[150px] right-[30px] w-[50px] h-[20px] bg-amber-100 border border-amber-200 rounded-md flex items-center justify-center">
                  <div className="w-[40px] h-[2px] bg-amber-700"></div>
                </div>
                
                {/* Professional smile */}
                <div className="absolute top-[80px] w-[40px] h-[10px] border-b-[2px] border-amber-700 rounded-full z-20"></div>
                
                {/* Sun icon as a pin/badge */}
                <div className="absolute top-[110px] left-[40px] w-[24px] h-[24px] bg-amber-400 rounded-full border-2 border-amber-500 flex items-center justify-center z-30">
                  <div className="w-[16px] h-[16px] bg-amber-300 rounded-full"></div>
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