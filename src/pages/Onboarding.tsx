import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, ArrowRight, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    healthConcern: ''
  });
  const [isExiting, setIsExiting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsExiting(true);
      // Delay navigation to allow exit animation
      setTimeout(() => {
        const initialMessage = `My name is ${userData.name}, my age is ${userData.age}, and my problem is: ${userData.healthConcern}`;
        navigate('/chat', { state: { initialMessage } });
      }, 800);
    }
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return userData.name.trim() !== '';
      case 2:
        return userData.age.trim() !== '';
      case 3:
        return userData.healthConcern.trim() !== '';
      default:
        return false;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)",
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const drHelioVariants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      y: -10,
      rotate: [0, -5, 5, 0],
      transition: {
        y: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
        rotate: { duration: 0.5 }
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background animated blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 -right-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-20 left-1/3 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl"
        />
      </div>

      <AnimatePresence mode="wait">
        {!isExiting && (
          <motion.div
            key="onboarding-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-2xl w-full bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-8 md:p-12 relative z-10"
          >
            {/* Progress Bar */}
            <div className="flex justify-between items-center mb-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 rounded-full -z-10"></div>
              <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full -z-10 transition-all duration-500 ease-out"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>

              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    scale: i === step ? 1.2 : 1,
                    backgroundColor: i <= step ? '#F59E0B' : '#E5E7EB',
                    borderColor: i <= step ? '#F59E0B' : '#E5E7EB'
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-white font-bold text-sm transition-colors duration-300 shadow-md ${i <= step ? 'shadow-amber-200' : ''
                    }`}
                >
                  {i < step ? <Check size={16} /> : i}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Dr. Helio Character */}
              <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
                <motion.div
                  variants={drHelioVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="relative w-32 h-32 md:w-40 md:h-40 mb-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-orange-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
                  <img
                    src="/images/dr-helio-avatar.svg"
                    alt="Dr. Helio"
                    className="w-full h-full object-contain drop-shadow-lg"
                    onError={(e) => {
                      // Fallback if image missing
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.classList.add('bg-amber-100', 'rounded-full', 'flex', 'items-center', 'justify-center');
                      e.currentTarget.parentElement!.innerHTML = '<span class="text-4xl">☀️</span>';
                    }}
                  />

                  {/* Speech Bubble */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 1, type: "spring" }}
                    className="absolute -top-6 -right-12 bg-white px-3 py-2 rounded-xl rounded-bl-none shadow-lg border border-amber-100"
                  >
                    <p className="text-xs font-bold text-amber-800 whitespace-nowrap">
                      {step === 1 && "Hi there! 👋"}
                      {step === 2 && "Great! ✨"}
                      {step === 3 && "Almost done! 🚀"}
                    </p>
                  </motion.div>
                </motion.div>
                <p className="text-center text-amber-800/70 font-medium text-sm">
                  Dr. Helio
                  <span className="block text-xs font-normal text-gray-500">Your AI Health Companion</span>
                </p>
              </div>

              {/* Form Content */}
              <div className="w-full md:w-2/3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <motion.h2
                        className="text-3xl font-bold text-gray-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {step === 1 && "Let's start with your name"}
                        {step === 2 && "How old are you?"}
                        {step === 3 && "What brings you here?"}
                      </motion.h2>
                      <p className="text-gray-500">
                        {step === 1 && "I'd love to know who I'm talking to."}
                        {step === 2 && "This helps me provide relevant advice for your age group."}
                        {step === 3 && "Tell me about your symptoms or health questions."}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {step === 1 && (
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-700 font-semibold">Your Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="e.g. Alex Smith"
                            value={userData.name}
                            onChange={handleInputChange}
                            className="h-12 text-lg border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl bg-white/80"
                            autoFocus
                          />
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-2">
                          <Label htmlFor="age" className="text-gray-700 font-semibold">Your Age</Label>
                          <Input
                            id="age"
                            name="age"
                            type="number"
                            placeholder="e.g. 28"
                            value={userData.age}
                            onChange={handleInputChange}
                            className="h-12 text-lg border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl bg-white/80"
                            autoFocus
                          />
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-2">
                          <Label htmlFor="healthConcern" className="text-gray-700 font-semibold">Health Concern</Label>
                          <Textarea
                            id="healthConcern"
                            name="healthConcern"
                            placeholder="e.g. I've been having headaches lately..."
                            value={userData.healthConcern}
                            onChange={handleInputChange}
                            className="min-h-[140px] text-lg border-gray-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl bg-white/80 resize-none"
                            autoFocus
                          />
                        </div>
                      )}

                      <div className="pt-4 flex gap-3">
                        {step > 1 && (
                          <Button
                            variant="outline"
                            onClick={() => setStep(step - 1)}
                            className="h-12 px-6 rounded-xl border-gray-200 hover:bg-gray-50 text-gray-600"
                          >
                            Back
                          </Button>
                        )}
                        <Button
                          onClick={handleNextStep}
                          disabled={!isStepComplete()}
                          className={`h-12 flex-1 rounded-xl text-lg font-medium transition-all duration-300 ${isStepComplete()
                              ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02]'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            {step < 3 ? 'Continue' : 'Start Chatting'}
                            {step < 3 ? <ArrowRight size={18} /> : <Sparkles size={18} />}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
