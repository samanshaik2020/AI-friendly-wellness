import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Brain, Utensils, Sparkles, Heart, Shield, Clock, Users, Award, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <MessageCircle className="h-8 w-8" />,
    title: "Intelligent Conversations",
    description: "Engage in natural, empathetic dialogue about your health concerns with our advanced AI companion.",
    color: "text-blue-500",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200"
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI-Powered Insights",
    description: "Leverage state-of-the-art machine learning to receive personalized health insights and analysis.",
    color: "text-purple-500",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200"
  },
  {
    icon: <Utensils className="h-8 w-8" />,
    title: "Tailored Recommendations",
    description: "Get customized suggestions for nutrition, lifestyle changes, and wellness routines.",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "group-hover:border-green-200"
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "Always Available",
    description: "Access professional-grade healthcare guidance 24/7, whenever you need it most.",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "group-hover:border-orange-200"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Secure & Private",
    description: "Your health data is encrypted and protected with enterprise-grade security protocols.",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    border: "group-hover:border-indigo-200"
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Evidence-Based",
    description: "All recommendations are grounded in the latest medical research and clinical guidelines.",
    color: "text-amber-500",
    bg: "bg-amber-50",
    border: "group-hover:border-amber-200"
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
            }, index * 100);
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
    <div id="features" className="relative py-32 bg-gray-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100/50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-6">
            Why Choose Dr. Helio
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            Comprehensive Care, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Powered by Intelligence</span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Experience a new standard of digital healthcare with features designed to prioritize your well-being and peace of mind.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featureRefs.current[index] = el}
              className={`group relative p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${visibleFeatures[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:text-amber-600 transition-colors cursor-pointer">
                Learn more
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Hover Gradient Border */}
              <div className={`absolute inset-0 border-2 border-transparent ${feature.border} rounded-3xl pointer-events-none transition-colors duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
