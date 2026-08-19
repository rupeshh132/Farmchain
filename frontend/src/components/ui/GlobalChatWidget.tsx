import React, { useState, useRef, useEffect } from 'react';
import { Mic, Send, Bot, User, Volume2, X, MessageSquareText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../../i18n/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export const GlobalChatWidget: React.FC = () => {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessage = language === 'hi' 
    ? "नमस्ते! मैं आपका FarmChain AI सलाहकार हूँ। आप मुझसे खेती, मौसम, या मंडी के भाव से जुड़ा कोई भी सवाल पूछ सकते हैं।"
    : "Hello! I am your FarmChain AI Agronomist. Ask me anything about farming, weather, or market rates.";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: initialMessage,
      timestamp: new Date()
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    const typingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: typingId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    }]);

    try {
      // Format messages for the backend API
      const apiMessages = messages.concat(userMessage).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      })).filter(msg => msg.content !== ''); // filter out the typing indicator

      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:8080/api/ai/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setMessages(prev => prev.map(msg => 
        msg.id === typingId 
          ? { ...msg, isTyping: false, content: data.content || JSON.stringify(data) } 
          : msg
      ));

    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => prev.map(msg => 
        msg.id === typingId 
          ? { ...msg, isTyping: false, content: "Sorry, I am having trouble connecting to the AI server. Please make sure the backend is running and the API key is configured." } 
          : msg
      ));
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate voice input for now
      setTimeout(() => {
        setIsListening(false);
        setInput(language === 'hi' ? 'गेहूं के लिए कौनसी खाद डालें?' : 'What fertilizer is best for wheat?');
      }, 3000);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-4 rounded-full bg-[#C6F135] text-[#0B2E1E] shadow-xl hover:scale-105 transition-transform ${isOpen ? 'pointer-events-none' : ''}`}
      >
        <MessageSquareText size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-[90vw] max-w-[400px] h-[80vh] max-h-[600px] flex flex-col bg-[#F4F6F3] rounded-2xl shadow-2xl overflow-hidden border border-[#E5E9E3]"
          >
            {/* Header */}
            <div className="bg-[#0B2E1E] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#133D2A] flex items-center justify-center text-[#C6F135]">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="text-white font-heading font-semibold">AI Agronomist</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C6F135] animate-pulse" />
                    <span className="text-white/70 text-xs font-body">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3 font-body text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#0B2E1E] text-white rounded-br-sm'
                      : 'bg-white text-[#14251B] border border-[#E5E9E3] rounded-bl-sm shadow-sm'
                  }`}>
                    {msg.isTyping ? (
                      <span className="flex gap-1 items-center h-5 px-1">
                        <span className="w-1.5 h-1.5 bg-[#0B2E1E]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#0B2E1E]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#0B2E1E]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    ) : (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    )}
                    {!msg.isTyping && (
                      <div className={`text-[9px] mt-1 text-right ${msg.role === 'user' ? 'text-white/60' : 'text-[#14251B]/50'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-3 border-t border-[#E5E9E3] shrink-0">
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleListening}
                  className={`p-2.5 rounded-full transition-colors flex shrink-0 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-[#F4F6F3] text-[#14251B] hover:bg-[#E5E9E3]'
                  }`}
                >
                  {isListening ? <Volume2 size={20} /> : <Mic size={20} />}
                </button>
                
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? (language === 'hi' ? "सुन रहा हूँ..." : "Listening...") : "Ask anything..."}
                  className="flex-1 bg-[#F4F6F3] rounded-full px-4 py-2.5 font-body text-sm text-[#14251B] placeholder:text-[#14251B]/40 focus:outline-none focus:ring-2 focus:ring-[#C6F135]"
                  disabled={isProcessing || isListening}
                />
                
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isProcessing || isListening}
                  className="p-2.5 rounded-full bg-[#C6F135] text-[#0B2E1E] hover:bg-[#b5e022] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                >
                  <Send size={20} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
