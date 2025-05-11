
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    quote: "Dr. Helio brightened my day by helping me understand my symptoms when I was too anxious to visit a doctor. The suggestions were spot on!",
    name: "Azad",
    role: "Teacher",
    avatarUrl: "https://i.pravatar.cc/150?img=52"
  },
  {
    quote: "I love how Dr. Helio follows up with me after our chats. It feels like having a sunshine healthcare companion by my side.",
    name: "Raj",
    role: "Software Engineer",
    avatarUrl: "https://i.pravatar.cc/150?img=2"
  },
  {
    quote: "The warm nutrition advice I got was personalized and easy to follow. I've been feeling much brighter and healthier since.",
    name: "Naveen",
    role: "Graphic Designer",
    avatarUrl: "https://i.pravatar.cc/150?img=23"
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background sun rays */}
      <svg className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 opacity-10" viewBox="0 0 1200 100">
        <path 
          className="sunray-line" 
          d="M0,50 Q300,30 400,50 T600,70 T900,30 T1200,50" 
          fill="none" 
          stroke="#F59E0B" 
          strokeWidth="2"
        />
      </svg>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-amber-700">What People Say About Dr. Helio</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-8 flex flex-col items-center text-center"
            >
              <Avatar className="w-16 h-16 border-4 border-amber-100 shadow-md mb-6">
                <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
