'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const demoMessages = [
  {
    role: 'bot' as const,
    text: "Hi there! I'm an AI assistant for Velora Innovations. How can I help you today?",
  },
  {
    role: 'bot' as const,
    text: 'You can ask me about our AI automation services, pricing, or book a free consultation.',
  },
] satisfies ChatMessage[]

interface ChatMessage {
  role: 'bot' | 'user'
  text: string
}

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(demoMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = input.trim()
    setInput('')
    setMessages((prev) => [...prev, { role: 'user' as const, text: userMsg }])
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      let response = "Thanks for your interest! For detailed questions, I'd recommend booking a free consultation where our team can provide personalized advice based on your specific business needs."

      const lower = userMsg.toLowerCase()
      if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
        response = "Pricing varies based on the number of workflows, integrations, and usage. Projects typically start with a one-time implementation fee. I'd recommend booking a consultation for a personalized quote."
      } else if (lower.includes('appointment') || lower.includes('booking')) {
        response = "Yes! Our appointment agent can check real-time availability, book appointments, handle rescheduling, and send automated reminders. It integrates with your existing calendar system."
      } else if (lower.includes('phone') || lower.includes('call') || lower.includes('voice')) {
        response = "Our AI receptionist can answer calls 24/7, collect information, qualify leads, and route complex requests to your team. It clearly identifies itself as an AI system."
      } else if (lower.includes('consultation') || lower.includes('book') || lower.includes('talk')) {
        response = "I'd be happy to help you book a consultation! Scroll to the bottom of this page and click 'Book Your Free Consultation' or use the button in the navigation bar. It's a 30-minute practical conversation with no obligation."
      }

      setMessages((prev) => [...prev, { role: 'bot' as const, text: response }])
    }, 1200)
  }

  return (
    <div className="fixed bottom-20 left-6 z-[60] flex flex-col items-end gap-3 lg:bottom-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-[340px] sm:w-[380px] bg-card rounded-2xl border border-velora-border/60 shadow-2xl shadow-black/10 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-velora-border/40 bg-velora-navy">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-velora-emerald/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-velora-emerald-light" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Velora Assistant</p>
                  <p className="text-[11px] text-white/40">AI-powered · Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[280px] overflow-y-auto px-5 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed',
                    msg.role === 'user'
                      ? 'ml-auto bg-velora-navy text-white rounded-br-md'
                      : 'bg-muted/60 text-foreground/80 rounded-bl-md'
                  )}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-muted/60 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* AI Disclosure */}
            <p className="px-5 pb-1 text-[10px] text-foreground/25 leading-relaxed">
              You are interacting with an AI assistant. It may make mistakes.
            </p>

            {/* Input */}
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 bg-muted/40 border border-velora-border/40 rounded-xl px-3 py-1.5 focus-within:border-velora-emerald/30 focus-within:ring-1 focus-within:ring-velora-emerald/10 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about our services..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground/30 outline-none py-1"
                  aria-label="Type your message"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-velora-emerald text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-velora-emerald-dark transition-colors shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-12 h-12 rounded-full shadow-lg shadow-black/10 flex items-center justify-center transition-all duration-300',
          isOpen
            ? 'bg-velora-navy text-white shadow-xl shadow-black/15'
            : 'bg-velora-emerald text-white shadow-lg shadow-velora-emerald/25 hover:shadow-xl hover:shadow-velora-emerald/35'
        )}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </motion.button>
    </div>
  )
}
