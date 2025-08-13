
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Brain, Utensils, Sparkles, Heart, Shield, Clock, Users, Award } from 'lucide-react';

const features = [
  {
    icon: <MessageCircle className="h-12 w-12" />,
    title: "Intelligent Health Conversations",
    description: "Engage in natural, empathetic conversations about your health concerns with our AI companion.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50"
  },
  {
    icon: <Brain className="h-12 w-12" />,
    title: "AI-Powered Health Insights",
    description: "Get personalized health insights powered by advanced medical AI and machine learning.",
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-50 to-pink-50"
  },
  {
    icon: <Utensils className="h-12 w-12" />,
    title: "Personalized Recommendations",
    description: "Receive tailored suggestions for medicine, nutrition, and recovery based on your needs.",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50"
  },
  {
    icon: <Clock className="h-12 w-12" />,
    title: "24/7 Availability",
    description: "Access healthcare guidance anytime, anywhere - Dr. Helio never sleeps.",
    color: "from-orange-500 to-red-500",
    bgColor: "from-orange-50 to-red-50"
  },
  {
    icon: <Shield className="h-12 w-12" />,
    title: "Privacy & Security",
    description: "Your health data is protected with enterprise-grade security and HIPAA compliance.",
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-50 to-blue-50"
  },
  {
    icon: <Award className="h-12 w-12" />,
    title: "Evidence-Based Care",
    description: "All recommendations are based on the latest medical research and clinical guidelines.",
    color: "from-amber-500 to-yellow-500",
    bgColor: "from-amber-50 to-yellow-50"
  }
];

const FeatureSection: React.FC = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>(new Array(features.length).fill(false));
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleFeatures(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 200); // Stagger animation
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <div id="features" className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-amber-50/30 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full morphing-blob"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full morphing-blob" style={{animationDelay: '2s'}}></div>
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-amber-300/40 rounded-full animate-bounce"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-amber-800 text-sm font-medium mb-6 glow-effect">
            <Sparkles className="w-4 h-4 mr-2" />
            Comprehensive Healthcare Features
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-shadow-glow">
            How Dr. Helio Transforms
            <br />Your Healthcare Experience
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features that make Dr. Helio your most trusted healthcare companion, 
            combining cutting-edge AI with compassionate care.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => featureRefs.current[index] = el}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-700 hover-lift ${
                visibleFeatures[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Card background with gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-60`}></div>
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
              
              {/* Card content */}
              <div className="relative p-8 h-full flex flex-col">
                {/* Icon container */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 glow-effect`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-amber-700 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed flex-grow">
                  {feature.description}
                </p>
                
                {/* Hover effect indicator */}
                <div className="mt-6 flex items-center text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <Sparkles className="w-4 h-4 ml-2" />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-white/10 to-transparent rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
        <div className="text-center mt-20 fade-in-up">
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full shadow-lg glow-effect">
            <Heart className="w-6 h-6" />
            <span className="font-semibold">Trusted by thousands of users worldwide</span>
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
