
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    quote: "Baymax helped me understand my symptoms when I was too anxious to visit a doctor. The suggestions were spot on!",
    name: "Sarah J.",
    role: "Teacher",
    avatarUrl: "https://i.pravatar.cc/150?img=32"
  },
  {
    quote: "I love how Baymax follows up with me after our chats. It feels like having a personal healthcare buddy.",
    name: "Mike T.",
    role: "Software Engineer",
    avatarUrl: "https://i.pravatar.cc/150?img=11"
  },
  {
    quote: "The nutrition advice I got was personalized and easy to follow. I've been feeling much better since.",
    name: "Elena R.",
    role: "Graphic Designer",
    avatarUrl: "https://i.pravatar.cc/150?img=26"
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <div className="py-20 relative overflow-hidden">
      {/* Background heartbeat line */}
      <svg className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 opacity-10" viewBox="0 0 1200 100">
        <path 
          className="heartbeat-line" 
          d="M0,50 Q300,50 400,20 T600,80 T900,10 T1200,50" 
          fill="none" 
          stroke="#33C3F0" 
          strokeWidth="2"
        />
      </svg>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">What People Say About Baymax</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="glass-card p-8 flex flex-col items-center text-center"
            >
              <Avatar className="w-16 h-16 border-4 border-white shadow-md mb-6">
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
