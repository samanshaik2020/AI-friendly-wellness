import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface BaymaxIntroProps {
  onIntroComplete: () => void;
}

const BaymaxIntro: React.FC<BaymaxIntroProps> = ({ onIntroComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Reset animation state when component mounts
    setAnimationStep(0);
    setShowIntro(true);
    
    // Animation sequence timing
    const timers = [
      setTimeout(() => setAnimationStep(1), 1000),  // Show Baymax circle
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
            {/* Baymax body */}
            <motion.div
              className="bg-white w-48 h-48 rounded-full border-4 border-gray-200 shadow-lg flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: animationStep >= 1 ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* Eyes */}
              {animationStep >= 2 && (
                <motion.div 
                  className="absolute flex space-x-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                </motion.div>
              )}

              {/* Heartbeat */}
              {animationStep >= 3 && (
                <motion.div
                  className="absolute top-12"
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Heart className="h-6 w-6 text-red-500 fill-red-500" />
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
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Hello, I am Baymax
                </h2>
                <p className="text-lg text-gray-600">
                  Your personal healthcare companion
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BaymaxIntro;
