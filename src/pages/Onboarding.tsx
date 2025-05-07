import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart } from 'lucide-react';

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    healthConcern: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Redirect to chat with the collected information
      const initialMessage = `My name is ${userData.name}, my age is ${userData.age}, and my problem is: ${userData.healthConcern}`;
      navigate('/chat', { state: { initialMessage } });
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

  return (
    <div className="min-h-[calc(100vh-64px)] bg-blue-50/30 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 bg-primary/5 h-32 w-32 rounded-full"></div>
        <div className="absolute -bottom-12 -left-12 bg-primary/5 h-32 w-32 rounded-full"></div>
        
        {/* Progress indicator */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`h-2 w-12 mx-1 rounded-full ${
                i <= step ? 'bg-primary' : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-full">
            <Heart className="h-8 w-8 text-baymax-red" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 && "Let's Get to Know You"}
          {step === 2 && "A Bit More Information"}
          {step === 3 && "How Can We Help You?"}
        </h2>
        
        <div className="space-y-4">
          {step === 1 && (
            <div className="space-y-2">
              <Label htmlFor="name">What's your name?</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={userData.name}
                onChange={handleInputChange}
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                We'll use this to personalize your experience.
              </p>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-2">
              <Label htmlFor="age">How old are you?</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="Enter your age"
                value={userData.age}
                onChange={handleInputChange}
                className="w-full"
              />
              <p className="text-sm text-gray-500">
                Your age helps us provide more relevant health information.
              </p>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-2">
              <Label htmlFor="healthConcern">What health concern brings you here today?</Label>
              <Textarea
                id="healthConcern"
                name="healthConcern"
                placeholder="Describe your health concern or question..."
                value={userData.healthConcern}
                onChange={handleInputChange}
                className="w-full min-h-[120px]"
              />
              <p className="text-sm text-gray-500">
                The more details you provide, the better we can assist you.
              </p>
            </div>
          )}
          
          <Button
            onClick={handleNextStep}
            disabled={!isStepComplete()}
            className="w-full mt-4"
          >
            {step < 3 ? 'Continue' : 'Start Chatting'}
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-4">
            Your information is kept private and secure. We use it only to provide you with personalized health guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
