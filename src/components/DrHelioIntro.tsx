import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun } from 'lucide-react';

interface DrHelioIntroProps {
  onIntroComplete: () => void;
}

const DrHelioIntro: React.FC<DrHelioIntroProps> = ({ onIntroComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Reset animation state when component mounts
    setAnimationStep(0);
    setShowIntro(true);
    
    // Animation sequence timing
    const timers = [
      setTimeout(() => setAnimationStep(1), 1000),  // Show Dr. Helio circle
      setTimeout(() => setAnimationStep(2), 2000),  // Show eyes
      setTimeout(() => setAnimationStep(3), 3000),  // Show heartbeat
      setTimeout(() => setAnimationStep(4), 4000),  // Show greeting text
      setTimeout(() => {
        setAnimationStep(5);                        // Fade out
        setTimeout(() => {
          setShowIntro(false);
          onIntroComplete();
        }, 1000);
      }, 6000)
    ];

    // Cleanup timers
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onIntroComplete]);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: animationStep === 5 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="relative flex flex-col items-center">
            {/* Dr. Helio body */}
            <motion.div
              className="bg-amber-50 w-48 h-48 rounded-xl border-4 border-amber-200 shadow-lg flex items-center justify-center overflow-hidden relative"
              initial={{ scale: 0 }}
              animate={{ scale: animationStep >= 1 ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Sun rays background */}
              <div className="absolute inset-0 bg-gradient-radial from-amber-300 to-amber-50 opacity-50"></div>
              {/* Glasses */}
              {animationStep >= 2 && (
                <motion.div 
                  className="absolute flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-24 h-4 flex justify-center items-center">
                    <div className="w-24 h-2 bg-transparent border-t-2 border-amber-700 flex justify-between px-4">
                      <div className="w-6 h-6 bg-transparent border-2 border-amber-700 rounded-full"></div>
                      <div className="w-6 h-6 bg-transparent border-2 border-amber-700 rounded-full"></div>
                    </div>
                  </div>
                  {/* Smile */}
                  <div className="mt-12 w-12 h-4 border-b-2 border-amber-700 rounded-full"></div>
                </motion.div>
              )}

              {/* Sun rays */}
              {animationStep >= 3 && (
                <motion.div
                  className="absolute -top-4"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                >
                  <div className="relative">
                    <Sun className="h-16 w-16 text-amber-400 fill-amber-300" />
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Sun className="h-10 w-10 text-amber-500 fill-amber-400" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Greeting text */}
            {animationStep >= 4 && (
              <motion.div
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-amber-700 mb-2">
                  Hello, I am Dr. Helio
                </h2>
                <p className="text-lg text-amber-600">
                  Your sunshine healthcare companion
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DrHelioIntro;
