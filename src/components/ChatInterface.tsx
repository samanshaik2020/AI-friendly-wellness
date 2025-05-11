
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Send, Sun, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { sendChatMessage, formatChatHistory } from '@/lib/openrouter-api';
import ProductAd from '@/components/ProductAd';
import { findRelevantProducts, HealthProduct } from '@/data/healthProducts';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'drhelio';
  timestamp: Date;
  relatedProducts?: HealthProduct[];
}

const HelioAvatar: React.FC = () => (
  <Avatar className="h-10 w-10 border-2 border-amber-100 shadow-sm">
    <AvatarImage src="/images/dr-helio-avatar.svg" alt="Dr. Helio" />
    <AvatarFallback className="bg-amber-400 text-amber-900">H</AvatarFallback>
  </Avatar>
);

const UserAvatar: React.FC = () => (
  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
    <AvatarFallback className="bg-gray-200 text-gray-600">
      <User className="h-5 w-5" />
    </AvatarFallback>
  </Avatar>
);

// Improved Dr. Helio model component
const TinyHelio: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <div className={`${className} absolute`} style={style}>
    <div className="relative w-12 h-16 bg-amber-50 rounded-xl flex flex-col items-center justify-center border border-amber-200 shadow-md overflow-hidden">
      {/* Sun rays around head */}
      <div className="absolute -top-1 left-0 right-0 h-8 w-full flex justify-center">
        <div className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-amber-400 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Glasses */}
      <div className="absolute top-[45%] w-8 h-3 flex justify-center items-center">
        <div className="w-8 h-2 bg-transparent border-t border-amber-700 flex justify-between px-1">
          <div className="w-2 h-2 bg-transparent border border-amber-700 rounded-full"></div>
          <div className="w-2 h-2 bg-transparent border border-amber-700 rounded-full"></div>
        </div>
      </div>
      
      {/* Smile */}
      <div className="absolute bottom-3 w-4 h-2 border-b-2 border-amber-700 rounded-full"></div>
    </div>
  </div>
);

const ChatInterface: React.FC = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageProcessedRef = useRef(false);
  const [showAds, setShowAds] = useState<boolean>(true); // Toggle for showing/hiding ads
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Dr. Helio, your sunshine healthcare companion. How can I brighten your health today?",
      sender: 'drhelio',
      timestamp: new Date()
    }
  ]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Process initial message from onboarding if available
  useEffect(() => {
    const processInitialMessage = async () => {
      // Check if we have an initial message from the onboarding flow
      const initialMessage = location.state?.initialMessage;
      
      if (initialMessage && !initialMessageProcessedRef.current) {
        initialMessageProcessedRef.current = true; // Prevent processing multiple times
        
        // Add user message
        const userMessage: Message = {
          id: messages.length + 1,
          text: initialMessage,
          sender: 'user',
          timestamp: new Date(),
          relatedProducts: findRelevantProducts(initialMessage) // Find relevant products
        };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        
        // Process the message with the AI
        setIsLoading(true);
        try {
          // Format chat history for the API
          const chatHistory = formatChatHistory(updatedMessages);
          
          // Get response from OpenRouter API
          const response = await sendChatMessage(initialMessage, chatHistory);
          
          // Add Dr. Helio response
          const drhelioMessage: Message = {
            id: updatedMessages.length + 1,
            text: response,
            sender: 'drhelio',
            timestamp: new Date(),
            relatedProducts: userMessage.relatedProducts // Pass along the related products
          };
          setMessages(prev => [...prev, drhelioMessage]);
        } catch (error) {
          console.error('Error getting AI response:', error);
          // Add error message
          const errorMessage: Message = {
            id: updatedMessages.length + 1,
            text: "I'm having trouble analyzing your information right now. Please try again in a moment.",
            sender: 'drhelio',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    processInitialMessage();
  }, [location.state]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (input.trim() && !isLoading) {
      // Find relevant products based on user input
      const relatedProducts = findRelevantProducts(input);
      
      // Add user message
      const userMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        timestamp: new Date(),
        relatedProducts: relatedProducts
      };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');
      setIsLoading(true);
      
      try {
        // Format chat history for the API
        const chatHistory = formatChatHistory(updatedMessages);
        
        // Get response from OpenRouter API (Llama 4 Scout)
        const response = await sendChatMessage(input, chatHistory);
        
        // Add Dr. Helio response
        const drhelioMessage: Message = {
          id: updatedMessages.length + 1,
          text: response,
          sender: 'drhelio',
          timestamp: new Date(),
          relatedProducts: userMessage.relatedProducts // Pass along the related products
        };
        setMessages(prev => [...prev, drhelioMessage]);
      } catch (error) {
        console.error('Error getting AI response:', error);
        // Add error message
        const errorMessage: Message = {
          id: updatedMessages.length + 1,
          text: "I'm having trouble connecting right now. Please try again in a moment.",
          sender: 'drhelio',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] relative bg-amber-50/30">
      {/* Tiny Dr. Helio models scattered around with reduced opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <TinyHelio className="top-[10%] left-[5%] animate-float" style={{ animationDelay: '0s' }} />
        <TinyHelio className="top-[30%] right-[8%] animate-float" style={{ animationDelay: '1.5s' }} />
        <TinyHelio className="bottom-[25%] left-[12%] animate-float" style={{ animationDelay: '2.3s' }} />
        <TinyHelio className="top-[15%] right-[25%] animate-float" style={{ animationDelay: '0.7s' }} />
        <TinyHelio className="bottom-[15%] right-[15%] animate-float" style={{ animationDelay: '3.1s' }} />
        {isMobile && (
          <>
            <TinyHelio className="top-[45%] left-[80%] animate-float" style={{ animationDelay: '1.8s' }} />
            <TinyHelio className="bottom-[35%] left-[30%] animate-float" style={{ animationDelay: '2.5s' }} />
          </>
        )}
        {!isMobile && (
          <>
            <TinyHelio className="top-[60%] left-[20%] animate-float" style={{ animationDelay: '1.2s' }} />
            <TinyHelio className="top-[70%] right-[30%] animate-float" style={{ animationDelay: '3.5s' }} />
            <TinyHelio className="top-[20%] left-[40%] animate-float" style={{ animationDelay: '0.9s' }} />
            <TinyHelio className="bottom-[10%] left-[55%] animate-float" style={{ animationDelay: '2.7s' }} />
          </>
        )}
      </div>
      
      {/* Chat interface */}
      <div className="flex flex-col h-full relative z-20">
        {/* Messages container - increased width */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full max-w-[1600px] mx-auto" id="chat-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}
            >
              <div className={`flex ${message.sender === 'user' ? 'flex-row-reverse max-w-[80%]' : 'flex-row max-w-[95%] lg:max-w-[85%]'} relative w-full`}>
                {message.sender === 'drhelio' ? <HelioAvatar /> : <UserAvatar />}
                
                <div 
                  className={`mx-2 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'bg-primary text-white p-4' 
                      : 'bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100'
                  } ${message.sender === 'drhelio' && showAds && message.relatedProducts && message.relatedProducts.length > 0 && !isMobile ? 'flex flex-row gap-4' : 'flex flex-col'}`}
                >
                  {/* Message content */}
                  <div className="whitespace-pre-line p-4 flex-1 max-w-[800px] lg:max-w-[1000px]">
                    {message.sender === 'drhelio'
                      ? (() => {
                          // First, handle any HTML tags already in the text
                          let processedText = message.text;
                          
                          // Convert markdown-style bold to HTML
                          processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                          
                          // Split by line breaks
                          return processedText.split('\n').map((line, i) => {
                            // Skip empty lines but preserve spacing
                            if (line.trim() === '') return <div key={`empty-${i}`} className="h-2"></div>;
                            
                            // Check for nested lists (indented items)
                            const isNestedListItem = line.match(/^\s+\d+\.\s/);
                            const isListItem = line.match(/^\d+\.\s/);
                            const isBulletPoint = line.match(/^\*\s/);
                            const isHeading = line.match(/^[A-Z][^:]+:/);
                            
                            // Apply appropriate styling based on line type
                            if (isNestedListItem) {
                              return (
                                <p key={i} className="ml-6 my-1" dangerouslySetInnerHTML={{ __html: line.trim() }} />
                              );
                            } else if (isListItem || isHeading) {
                              return (
                                <p key={i} className="font-bold my-1" dangerouslySetInnerHTML={{ __html: line }} />
                              );
                            } else if (isBulletPoint) {
                              return (
                                <p key={i} className="ml-2 my-1" dangerouslySetInnerHTML={{ __html: line }} />
                              );
                            } else {
                              // Regular line with possible HTML tags
                              return <p key={i} className="my-1" dangerouslySetInnerHTML={{ __html: line }} />;
                            }
                          });
                        })()
                      : message.text
                    }
                  </div>
                  
                  {/* Product Advertisements - responsive layout based on device */}
                  {showAds && message.sender === 'drhelio' && message.relatedProducts && message.relatedProducts.length > 0 && (
                    <div className={`${isMobile ? 
                      'p-3 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl w-full mt-2' : 
                      'p-3 border-l border-gray-100 bg-gray-50/50 rounded-r-2xl min-w-[240px] w-[25%] max-w-[400px]'}`}
                    >
                      <p className="text-xs text-gray-500 mb-2 font-medium">Recommended Products</p>
                      <div className={`${isMobile ? 'grid grid-cols-1 gap-3' : 'space-y-3'}`}>
                        {message.relatedProducts.map(product => (
                          <ProductAd key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )}
                  {message.sender === 'user' ? (
                    <p className="text-xs mt-1 text-blue-100 px-4">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  ) : (
                    <div className="absolute bottom-1 left-16 text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator with emojis */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] flex-row">
                <HelioAvatar />
                <div className="mx-2 p-4 rounded-2xl bg-amber-50/80 backdrop-blur-sm shadow-sm border border-amber-100">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
                    <p className="text-amber-700 flex items-center">
                      <span className="loading-text">
                        <span className="mr-1">Analyzing</span>
                        <span className="inline-block mx-0.5 animate-bounce">☀️</span>
                        <span className="inline-block mx-0.5 animate-pulse delay-75">🌡️</span>
                        <span className="inline-block mx-0.5 animate-bounce delay-150">🍊</span>
                        <span className="inline-block mx-0.5 animate-pulse delay-200">🔆</span>
                        <span className="inline-block mx-0.5 animate-bounce delay-300">🌻</span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Invisible div for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-gray-100">
          <div className="flex space-x-2 max-w-6xl w-full mx-auto">
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
              disabled={isLoading || !input.trim()}
              className="rounded-full bg-primary hover:bg-primary/90 h-10 w-10 p-0 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <div className="flex justify-between items-center max-w-6xl w-full mx-auto">
            <p className="text-xs text-amber-700 mt-2 text-center flex-1">
              Dr. Helio is here to provide bright health information, not medical advice. Always consult a healthcare professional.
            </p>
            <button 
              onClick={() => setShowAds(!showAds)} 
              className="text-xs text-primary underline mt-2 ml-2"
            >
              {showAds ? 'Hide Ads' : 'Show Ads'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
