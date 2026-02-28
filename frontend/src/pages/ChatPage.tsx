import { useState, useRef, useEffect } from 'react';
import { useChatWithAssistant } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Send, Loader2, RefreshCw, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isPending, isError, reset } = useChatWithAssistant();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isPending) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');

    sendMessage(text, {
      onSuccess: (response) => {
        setMessages((prev) => [...prev, { role: 'assistant', text: response.text }]);
      },
      onError: () => {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' },
        ]);
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRetry = () => {
    reset();
    setMessages([]);
  };

  return (
    <div className="chat-page-bg min-h-screen flex flex-col">
      {/* Chat header */}
      <div className="border-b border-white/10 px-4 py-4" style={{ backgroundColor: 'oklch(0.12 0.03 40 / 0.95)' }}>
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <div className="relative">
            <img
              src="/assets/generated/ai-girl-avatar.dim_512x512.png"
              alt="AI Assistant"
              className="w-12 h-12 rounded-full object-cover border-2"
              style={{ borderColor: 'var(--primary)' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg';
                  fallback.style.background = 'linear-gradient(135deg, var(--primary), var(--accent))';
                  fallback.textContent = 'AI';
                  parent.appendChild(fallback);
                }
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background"
              style={{ backgroundColor: 'var(--success)' }}
            />
          </div>
          <div>
            <h2 className="font-display font-semibold text-white">Rweb AI Assistant</h2>
            <p className="text-xs flex items-center gap-1" style={{ color: 'var(--primary)' }}>
              <Sparkles size={10} />
              Online · Ready to help
            </p>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRetry}
              className="ml-auto gap-2 text-white/60 hover:text-white hover:bg-white/10"
            >
              <RefreshCw size={14} />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
              >
                <Sparkles size={36} className="text-white" />
              </div>
              <h3 className="font-display font-semibold text-xl text-white mb-2">
                Hi! I'm your Laptop Assistant
              </h3>
              <p className="text-sm mb-6" style={{ color: 'oklch(0.65 0.03 60)' }}>
                Ask me anything about laptops, specs, pricing, or recommendations!
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  'Best laptop for students?',
                  'Compare MacBook vs Dell XPS',
                  'Gaming laptop under ₹80,000?',
                  'Best laptop for video editing?',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="px-4 py-2 rounded-full text-sm border transition-all hover:scale-105"
                    style={{
                      borderColor: 'oklch(0.65 0.19 45 / 0.40)',
                      color: 'var(--primary)',
                      backgroundColor: 'oklch(0.65 0.19 45 / 0.10)',
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className="shrink-0">
                {msg.role === 'assistant' ? (
                  <img
                    src="/assets/generated/ai-girl-avatar.dim_512x512.png"
                    alt="AI"
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    You
                  </div>
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'
                }`}
                style={
                  msg.role === 'user'
                    ? { backgroundColor: 'var(--primary)', color: 'white' }
                    : {
                        backgroundColor: 'oklch(0.20 0.04 40)',
                        color: 'oklch(0.90 0.02 60)',
                        border: '1px solid oklch(0.30 0.05 45)',
                      }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isPending && (
            <div className="flex gap-3 animate-fade-in">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--primary), var(--accent))' }}
              >
                <Sparkles size={14} className="text-white" />
              </div>
              <div
                className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2"
                style={{ backgroundColor: 'oklch(0.20 0.04 40)', border: '1px solid oklch(0.30 0.05 45)' }}
              >
                <Loader2 size={14} className="animate-spin" style={{ color: 'var(--primary)' }} />
                <span className="text-sm" style={{ color: 'oklch(0.65 0.03 60)' }}>Thinking...</span>
              </div>
            </div>
          )}

          {isError && (
            <div className="text-center py-4">
              <p className="text-sm text-destructive mb-2">Something went wrong.</p>
              <Button variant="outline" size="sm" onClick={handleRetry} className="gap-2">
                <RefreshCw size={14} /> Try Again
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-white/10 px-4 py-4" style={{ backgroundColor: 'oklch(0.12 0.03 40 / 0.95)' }}>
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about laptops, specs, prices..."
            disabled={isPending}
            className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all disabled:opacity-50"
            style={{
              backgroundColor: 'oklch(0.20 0.04 40)',
              color: 'oklch(0.90 0.02 60)',
              border: '1px solid oklch(0.30 0.05 45)',
            }}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isPending}
            size="icon"
            className="w-12 h-12 rounded-xl shrink-0 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            style={{ backgroundColor: 'var(--primary)', color: 'white' }}
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
}
