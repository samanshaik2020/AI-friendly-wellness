import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote, Heart } from 'lucide-react';

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
    <div id="testimonials" className="relative py-32 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100/50 border border-amber-200 text-amber-800 text-xs font-semibold tracking-wide uppercase mb-6">
            Testimonials
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            Loved by Thousands <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Worldwide</span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Join the growing community of users who trust Dr. Helio for their daily health and wellness guidance.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              ref={el => testimonialRefs.current[index] = el}
              className={`group relative p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1 ${visibleTestimonials[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-amber-100 group-hover:text-amber-200 transition-colors" />
              </div>

              <blockquote className="text-gray-700 leading-relaxed mb-8 text-lg">
                "{testimonial.quote}"
              </blockquote>

              <div className="flex items-center">
                <Avatar className="w-12 h-12 border-2 border-white shadow-sm mr-4">
                  <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                  <AvatarFallback className="bg-amber-100 text-amber-700">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-24 pt-12 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[
              { label: 'Happy Users', value: '50K+' },
              { label: 'Conversations', value: '1M+' },
              { label: 'App Store Rating', value: '4.9' },
              { label: 'Response Time', value: '<1s' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
