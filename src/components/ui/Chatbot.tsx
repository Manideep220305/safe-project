import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 I'm the SheSafe Assistant. How can I help you stay safe today?",
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), text: input.trim(), sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "My AI brain is still being wired up by the SheSafe team! For now, try checking out our Premium Protect Pendants. Stay tuned! 💜",
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full gradient-rose shadow-rose-lg flex items-center justify-center z-50 text-white hover:brightness-110 transition-all duration-200"
            aria-label="Open chat"
          >
            <MessageSquare size={24} strokeWidth={2} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-[360px] max-w-[calc(100vw-48px)] h-[540px] max-h-[calc(100vh-48px)] bg-white rounded-3xl shadow-[0_24px_80px_rgba(18,36,46,0.15)] flex flex-col z-50 overflow-hidden border border-slate-200/60"
          >
            {/* Header */}
            <div className="gradient-hero p-5 flex items-center justify-between shrink-0 relative">
              <div className="absolute inset-0 pointer-events-none noise-overlay" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-full flex items-center justify-center relative shadow-sm" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <Bot size={20} className="text-white relative z-10" />
                  {/* Subtle pulsing glow for bot icon */}
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(255,255,255,0.2)', animationDuration: '3s' }} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-[17px] leading-tight">SheSafe AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-sans text-[11px] text-white/70 uppercase tracking-widest font-medium">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors relative z-10"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 pb-0 flex flex-col gap-4 bg-white">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 font-sans text-[14px] leading-relaxed ${
                        isBot
                          ? 'bg-slate-100/80 text-slate-800 rounded-tl-sm'
                          : 'gradient-rose text-white rounded-tr-sm shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="bg-slate-100/80 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5 h-[52px]">
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>
                </motion.div>
              )}
              
              {/* Invisible spacer to scroll to bottoms */}
              <div ref={messagesEndRef} className="h-4" />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-100/50 border border-transparent rounded-full py-3.5 pl-5 pr-14 font-sans text-[14px] text-slate-800 focus:outline-none focus:bg-white focus:border-slate-200 focus:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className={`absolute right-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                    input.trim() && !isTyping ? 'gradient-rose shadow-md text-white scale-100' : 'bg-transparent text-slate-400 scale-95'
                  }`}
                >
                  <Send size={18} strokeWidth={2} className={input.trim() && !isTyping ? 'ml-0.5' : ''} />
                </button>
              </form>
              <div className="text-center mt-3 mb-1">
                <span className="font-sans text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <Sparkles size={10} /> AI-powered support. Responses may vary.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
