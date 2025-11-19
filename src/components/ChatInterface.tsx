import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Send, Sun, Loader2, ArrowLeft, MoreVertical, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { sendChatMessage, formatChatHistory } from '@/lib/gemini-api';
import ProductAd from '@/components/ProductAd';
import { findRelevantProducts, HealthProduct } from '@/data/healthProducts';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'drhelio';
  timestamp: Date;
  relatedProducts?: HealthProduct[];
}

const HelioAvatar: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14'
  };

  return (
    <div className="relative">
      <Avatar className={`${sizeClasses[size]} border-2 border-amber-100 shadow-sm bg-amber-50`}>
        <AvatarImage src="/images/dr-helio-avatar.svg" alt="Dr. Helio" className="object-cover" />
        <AvatarFallback className="bg-amber-100 text-amber-700 font-bold">DH</AvatarFallback>
      </Avatar>
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
    </div>
  );
};

const UserAvatar: React.FC = () => (
  <Avatar className="h-10 w-10 border-2 border-white shadow-sm bg-blue-50">
    <AvatarFallback className="bg-blue-100 text-blue-700 font-bold">
      <User className="h-5 w-5" />
    </AvatarFallback>
  </Avatar>
);

const ChatInterface: React.FC = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageProcessedRef = useRef(false);
  const [showAds, setShowAds] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm Dr. Helio, your sunshine healthcare companion. ☀️\nHow can I brighten your health today?",
      sender: 'drhelio',
      timestamp: new Date()
    }
  ]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Process initial message from onboarding if available
  useEffect(() => {
    const processInitialMessage = async () => {
      const initialMessage = location.state?.initialMessage;

      if (initialMessage && !initialMessageProcessedRef.current) {
        initialMessageProcessedRef.current = true;

        const userMessage: Message = {
          id: messages.length + 1,
          text: initialMessage,
          sender: 'user',
          timestamp: new Date(),
          relatedProducts: findRelevantProducts(initialMessage)
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
          const chatHistory = formatChatHistory([...messages, userMessage]);
          const response = await sendChatMessage(initialMessage, chatHistory);

          const drhelioMessage: Message = {
            id: messages.length + 2,
            text: response,
            sender: 'drhelio',
            timestamp: new Date(),
            relatedProducts: userMessage.relatedProducts
          };
          setMessages(prev => [...prev, drhelioMessage]);
        } catch (error) {
          console.error('Error getting AI response:', error);
          const errorMessage: Message = {
            id: messages.length + 2,
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
      const relatedProducts = findRelevantProducts(input);

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
        const chatHistory = formatChatHistory(updatedMessages);
        const response = await sendChatMessage(input, chatHistory);

        const drhelioMessage: Message = {
          id: updatedMessages.length + 1,
          text: response,
          sender: 'drhelio',
          timestamp: new Date(),
          relatedProducts: userMessage.relatedProducts
        };
        setMessages(prev => [...prev, drhelioMessage]);
      } catch (error) {
        console.error('Error getting AI response:', error);
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
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-yellow-100/50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between z-20 sticky top-0 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Button>
          <HelioAvatar size="md" />
          <div>
            <h1 className="font-bold text-slate-800 flex items-center gap-2">
              Dr. Helio
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-full">AI Doctor</span>
            </h1>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Online & Ready to Help
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-amber-600 hidden md:flex"
            onClick={() => setShowAds(!showAds)}
          >
            {showAds ? 'Hide Recommendations' : 'Show Recommendations'}
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 z-10 scroll-smooth" id="chat-messages">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} w-full group`}
            >
              <div className={`flex gap-3 max-w-[95%] md:max-w-[85%] lg:max-w-[75%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0 mt-1">
                  {message.sender === 'drhelio' ? <HelioAvatar size="sm" /> : <UserAvatar />}
                </div>

                <div className="flex flex-col gap-2">
                  <div
                    className={`p-4 rounded-2xl shadow-sm relative ${message.sender === 'user'
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-tr-none'
                        : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                      }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed">
                      {message.sender === 'drhelio' ? (
                        <div dangerouslySetInnerHTML={{
                          __html: message.text
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/^\s*[\-\*]\s+(.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
                            .replace(/(<li.*<\/li>)/s, '<ul class="my-2 space-y-1">$1</ul>')
                        }} />
                      ) : (
                        message.text
                      )}
                    </div>
                    <span className={`text-[10px] absolute bottom-1 ${message.sender === 'user' ? 'left-2 text-amber-100' : 'right-2 text-slate-400'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Product Recommendations */}
                  {showAds && message.sender === 'drhelio' && message.relatedProducts && message.relatedProducts.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/50 backdrop-blur-sm border border-amber-100 rounded-xl p-3 mt-1"
                    >
                      <div className="flex items-center gap-2 mb-3 text-amber-800 font-medium text-sm px-1">
                        <Sparkles className="w-4 h-4" />
                        <span>Recommended for you</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {message.relatedProducts.map(product => (
                          <ProductAd key={product.id} product={product} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start w-full"
          >
            <div className="flex gap-3 max-w-[80%]">
              <HelioAvatar size="sm" />
              <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-3">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], backgroundColor: ["#F59E0B", "#FCD34D", "#F59E0B"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-amber-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], backgroundColor: ["#F59E0B", "#FCD34D", "#F59E0B"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-amber-500 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], backgroundColor: ["#F59E0B", "#FCD34D", "#F59E0B"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-amber-500 rounded-full"
                  />
                </div>
                <span className="text-xs text-slate-400 font-medium">Dr. Helio is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-white/80 backdrop-blur-lg border-t border-slate-100 z-20">
        <div className="max-w-4xl mx-auto relative">
          <div className="relative flex items-center gap-2 bg-white border-2 border-slate-100 focus-within:border-amber-400 rounded-full px-2 py-2 shadow-sm transition-all duration-300 hover:shadow-md">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-amber-600 rounded-full shrink-0">
              <Sparkles className="h-5 w-5" />
            </Button>

            <Input
              type="text"
              placeholder="Ask Dr. Helio anything about your health..."
              className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent text-base placeholder:text-slate-400 h-10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />

            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className={`rounded-full h-10 w-10 p-0 shrink-0 transition-all duration-300 ${input.trim()
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:shadow-lg hover:scale-105'
                  : 'bg-slate-100 text-slate-300'
                }`}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5 ml-0.5" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-slate-400 text-center mt-3">
            AI can make mistakes. Please consult a medical professional for serious health concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
