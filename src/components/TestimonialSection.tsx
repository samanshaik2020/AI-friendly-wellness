
import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote, Heart, Sparkles } from 'lucide-react';

const testimonials = [
  {
    quote: "Dr. Helio brightened my day by helping me understand my symptoms when I was too anxious to visit a doctor. The suggestions were spot on!",
    name: "Azad",
    role: "Teacher",
    avatarUrl: "https://i.pravatar.cc/150?img=52",
    rating: 5,
    location: "New York, USA"
  },
  {
    quote: "I love how Dr. Helio follows up with me after our chats. It feels like having a sunshine healthcare companion by my side.",
    name: "Raj",
    role: "Software Engineer", 
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    location: "San Francisco, USA"
  },
  {
    quote: "The warm nutrition advice I got was personalized and easy to follow. I've been feeling much brighter and healthier since.",
    name: "Naveen",
    role: "Graphic Designer",
    avatarUrl: "https://i.pravatar.cc/150?img=23",
    rating: 5,
    location: "London, UK"
  },
  {
    quote: "Dr. Helio helped me manage my anxiety about health issues. The 24/7 availability is a game-changer for my peace of mind.",
    name: "Sarah",
    role: "Marketing Manager",
    avatarUrl: "https://i.pravatar.cc/150?img=44",
    rating: 5,
    location: "Toronto, Canada"
  },
  {
    quote: "As a busy parent, having Dr. Helio available for quick health questions about my kids has been incredibly valuable.",
    name: "Michael",
    role: "Parent & Entrepreneur",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    location: "Sydney, Australia"
  },
  {
    quote: "The personalized health insights and gentle approach make Dr. Helio feel like a trusted friend who happens to be a medical expert.",
    name: "Priya",
    role: "Yoga Instructor",
    avatarUrl: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    location: "Mumbai, India"
  }
];

const TestimonialSection: React.FC = () => {
  const [visibleTestimonials, setVisibleTestimonials] = useState<boolean[]>(new Array(testimonials.length).fill(false));
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = testimonialRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleTestimonials(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 150);
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
    <div id="testimonials" className="relative py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated background rays */}
        <svg className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 opacity-20" viewBox="0 0 1200 120">
          <path 
            className="sunray-line" 
            d="M0,60 Q200,20 400,60 T800,40 T1200,60" 
            fill="none" 
            stroke="url(#gradient1)" 
            strokeWidth="3"
          />
          <path 
            className="sunray-line" 
            d="M0,80 Q300,40 600,80 T1200,80" 
            fill="none" 
            stroke="url(#gradient2)" 
            strokeWidth="2"
            style={{animationDelay: '2s'}}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#EAB308" stopOpacity="0.3"/>
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EAB308" stopOpacity="0.2"/>
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full morphing-blob"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-yellow-200/30 to-amber-200/30 rounded-full morphing-blob" style={{animationDelay: '3s'}}></div>
        
        {/* Sparkle effects */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          >
            <Sparkles className="w-4 h-4 text-amber-400/60" />
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20 fade-in-up">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-amber-800 text-sm font-medium mb-6 glow-effect">
            <Heart className="w-4 h-4 mr-2" />
            Loved by Thousands Worldwide
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-shadow-glow">
            What People Say About
            <br />Dr. Helio
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied users who have transformed their healthcare experience with Dr. Helio's 
            compassionate AI-powered guidance.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              ref={el => testimonialRefs.current[index] = el}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-700 hover-lift ${
                visibleTestimonials[index] 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
            >
              {/* Card background */}
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm border border-amber-100/50 rounded-2xl shadow-lg"></div>
              
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-amber-600" />
              </div>
              
              {/* Card content */}
              <div className="relative p-8">
                {/* Avatar and user info */}
                <div className="flex items-center mb-6">
                  <Avatar className="w-14 h-14 border-3 border-gradient-to-r from-amber-400 to-orange-400 shadow-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 font-semibold">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-amber-600">{testimonial.location}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 text-amber-400 fill-current" 
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 leading-relaxed italic mb-4 group-hover:text-gray-900 transition-colors">
                  "{testimonial.quote}"
                </blockquote>

                {/* Verified badge */}
                <div className="flex items-center text-green-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Verified User
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-orange-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 text-center fade-in-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">50K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">1M+</div>
              <div className="text-gray-600">Conversations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">4.9★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">24/7</div>
              <div className="text-gray-600">Availability</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
