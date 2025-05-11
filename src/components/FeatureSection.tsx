
import React from 'react';
import { MessageCircle, Brain, Utensils } from 'lucide-react';

const features = [
  {
    icon: <MessageCircle className="h-12 w-12 text-amber-500" />,
    title: "Talk to Dr. Helio about your health symptoms",
    description: "Discuss your health concerns with Dr. Helio in a bright, judgment-free conversation."
  },
  {
    icon: <Brain className="h-12 w-12 text-amber-500" />,
    title: "Sunshine-powered health insights",
    description: "Get warm, thoughtful insights about your health powered by advanced medical AI."
  },
  {
    icon: <Utensils className="h-12 w-12 text-amber-500" />,
    title: "Get suggestions on medicine, food, and recovery time",
    description: "Receive personalized recommendations to brighten your path to feeling better."
  }
];

const FeatureSection: React.FC = () => {
  return (
    <div className="bg-amber-50/50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-amber-700">How Dr. Helio Brightens Your Health</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass-card p-8 flex flex-col items-center text-center"
            >
              <div className="bg-amber-100/60 p-4 rounded-full mb-6">
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
