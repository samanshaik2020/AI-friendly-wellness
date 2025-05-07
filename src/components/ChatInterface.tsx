
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Send, Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'baymax';
  timestamp: Date;
}

const BaymaxAvatar: React.FC = () => (
  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
    <AvatarImage src="/placeholder.svg" alt="Baymax" />
    <AvatarFallback className="bg-primary text-white">B</AvatarFallback>
  </Avatar>
);

const UserAvatar: React.FC = () => (
  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
    <AvatarFallback className="bg-gray-200 text-gray-600">
      <User className="h-5 w-5" />
    </AvatarFallback>
  </Avatar>
);

const BaymaxAnimation: React.FC = () => (
  <div className="flex justify-center items-center h-full">
    <div className="bg-white/90 rounded-2xl max-w-[300px] h-[300px] flex items-center justify-center shadow-md border border-gray-100 animate-float">
      <div className="relative w-[80%] h-[80%] rounded-full bg-gray-50 flex items-center justify-center border border-gray-200">
        <Heart className="absolute h-10 w-10 text-baymax-red animate-pulse" />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[2px]">
          <div className="w-full h-full flex justify-between">
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ChatInterface: React.FC = () => {
  const isMobile = useIsMobile();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Baymax, your personal healthcare companion. How can I assist you today?",
      sender: 'baymax',
      timestamp: new Date()
    }
  ]);

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user message
      const userMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, userMessage]);
      setInput('');
      
      // Simulate Baymax response
      setTimeout(() => {
        const baymaxMessage: Message = {
          id: messages.length + 2,
          text: "I'm analyzing your symptoms. Remember, I'm here to provide information and support, but always consult with a healthcare professional for medical advice.",
          sender: 'baymax',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, baymaxMessage]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] relative bg-blue-50/30">
      {/* Baymax model in background or side based on screen size */}
      <div className={`${isMobile ? 'absolute top-0 left-0 w-full h-1/3 z-10 opacity-80' : 'absolute top-0 left-0 w-1/2 h-full'}`}>
        <BaymaxAnimation />
      </div>
      
      {/* Chat interface */}
      <div className="flex flex-col h-full relative z-20">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {message.sender === 'baymax' ? <BaymaxAvatar /> : <UserAvatar />}
                
                <div 
                  className={`mx-2 p-4 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white' 
                      : 'bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input area */}
        <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-gray-100">
          <div className="flex space-x-2 max-w-4xl mx-auto">
            <Input 
              type="text"
              placeholder="Type your health question here..."
              className="flex-1 rounded-full bg-white/90"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <Button 
              onClick={handleSendMessage}
              className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 p-0 flex items-center justify-center"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center max-w-4xl mx-auto">
            Baymax is here to provide health information, not medical advice. Always consult a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
