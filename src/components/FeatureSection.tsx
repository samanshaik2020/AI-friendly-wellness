
import React from 'react';
import { MessageCircle, Brain, Food } from 'lucide-react';

const features = [
  {
    icon: <MessageCircle className="h-12 w-12 text-primary" />,
    title: "Talk to Baymax about your health symptoms",
    description: "Discuss your health concerns with Baymax in a comfortable, judgment-free conversation."
  },
  {
    icon: <Brain className="h-12 w-12 text-primary" />,
    title: "AI-powered diagnosis with kindness",
    description: "Get gentle, thoughtful insights about your health powered by advanced medical AI."
  },
  {
    icon: <Food className="h-12 w-12 text-primary" />,
    title: "Get suggestions on medicine, food, and recovery time",
    description: "Receive personalized recommendations to help you feel better faster."
  }
];

const FeatureSection: React.FC = () => {
  return (
    <div className="bg-blue-50/50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">How Baymax Helps You</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-8 flex flex-col items-center text-center"
            >
              <div className="bg-blue-100/60 p-4 rounded-full mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
