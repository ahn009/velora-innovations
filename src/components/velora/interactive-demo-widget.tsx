'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface ChatMessage {
  role: 'customer' | 'ai'
  text: string
}

const MESSAGES: ChatMessage[] = [
  {
    role: 'customer',
    text: "Hi, I'd like to schedule an air-conditioning service this week.",
  },
  {
    role: 'ai',
    text: "I can help with the request. The sample calendar shows Tuesday at 2 PM and Thursday at 10 AM. Which works better for you?",
  },
  {
    role: 'customer',
    text: 'Tuesday at 2 PM sounds perfect!',
  },
]

const TYPING_DURATION = 1500
const MESSAGE_INTERVAL = 2000

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-2.5"
    >
      <div className="w-7 h-7 rounded-full bg-velora-emerald/15 flex items-center justify-center shrink-0 mt-0.5">
        <div className="w-3.5 h-3.5 rounded-full bg-velora-emerald/30" />
      </div>
      <div className="bg-velora-emerald/10 border border-velora-emerald/15 rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block w-2 h-2 rounded-full bg-velora-emerald/50"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isAI = message.role === 'ai'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-2.5 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div
        className={`
          w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5
          ${
            isAI
              ? 'bg-velora-emerald/15'
              : 'bg-muted'
          }
        `}
      >
        <div
          className={`
            w-3.5 h-3.5 rounded-full
            ${
              isAI
                ? 'bg-velora-emerald/40'
                : 'bg-muted-foreground/30'
            }
          `}
        />
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
          ${
            isAI
              ? 'bg-velora-emerald/10 border border-velora-emerald/15 rounded-tl-md text-foreground/85'
              : 'bg-muted/60 border border-border/40 rounded-tr-md text-foreground/75'
          }
        `}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </motion.div>
  )
}

function ConfirmedBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2.5 bg-velora-emerald/10 border border-velora-emerald/20 rounded-xl px-4 py-3"
    >
      <CheckCircle2 className="w-5 h-5 text-velora-emerald shrink-0" />
      <p className="text-sm font-medium text-velora-emerald">
        Sample booking confirmed — Tuesday 2:00 PM
      </p>
    </motion.div>
  )
}

interface InteractiveDemoWidgetProps {
  onSeeFullDemo?: () => void
}

export function InteractiveDemoWidget({ onSeeFullDemo }: InteractiveDemoWidgetProps) {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-80px' })
  const [visibleMessages, setVisibleMessages] = useState<number>(0)
  const [showTyping, setShowTyping] = useState(false)
  const [showConfirmed, setShowConfirmed] = useState(false)
  const hasStartedRef = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const displayedMessageCount = reduceMotion ? MESSAGES.length : visibleMessages
  const displayedTyping = reduceMotion ? false : showTyping
  const displayedConfirmation = reduceMotion ? true : showConfirmed

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    if (!isInView || hasStartedRef.current) return
    hasStartedRef.current = true

    if (reduceMotion) {
      return
    }

    const timeoutIds: ReturnType<typeof setTimeout>[] = []

    MESSAGES.forEach((_, index) => {
      // Show typing indicator before each message
      const typingDelay = index === 0 ? 400 : index * (TYPING_DURATION + MESSAGE_INTERVAL) + 400
      const showMsgDelay = index === 0
        ? 400 + TYPING_DURATION
        : index * (TYPING_DURATION + MESSAGE_INTERVAL) + 400 + TYPING_DURATION

      timeoutIds.push(
        setTimeout(() => setShowTyping(true), typingDelay)
      )
      timeoutIds.push(
        setTimeout(() => {
          setShowTyping(false)
          setVisibleMessages((prev) => prev + 1)
        }, showMsgDelay)
      )
    })

    // Show confirmation after last message
    const totalDuration =
      (MESSAGES.length - 1) * (TYPING_DURATION + MESSAGE_INTERVAL) +
      400 +
      TYPING_DURATION +
      600
    timeoutIds.push(
      setTimeout(() => {
        setShowConfirmed(true)
      }, totalDuration)
    )

    return () => {
      timeoutIds.forEach(clearTimeout)
    }
  }, [isInView, reduceMotion])

  // Auto-scroll to bottom when new content appears
  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 50)
    return () => clearTimeout(timer)
  }, [displayedMessageCount, displayedTyping, displayedConfirmation, scrollToBottom])

  return (
    <div ref={containerRef} className="relative">
      {/* Guided sample badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-velora-emerald/10 border border-velora-emerald/20 px-3 py-1.5 text-xs font-semibold text-velora-emerald">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-velora-emerald opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-velora-emerald" />
          </span>
          Guided Sample
        </span>
        <span className="text-xs text-muted-foreground">Scripted scheduling workflow</span>
      </div>

      {/* Chat Container */}
      <div className="rounded-2xl border border-velora-border/60 dark:border-border/60 bg-velora-navy overflow-hidden shadow-xl">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-full bg-velora-emerald/20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-velora-emerald/40" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white/90">AI Scheduling Agent</p>
            <p className="text-[11px] text-white/70">Northwind Home Services (example)</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className="px-4 py-4 space-y-3 max-h-[340px] overflow-y-auto"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.1) transparent',
          }}
        >
          {/* System message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-center"
          >
            <span className="inline-block text-[11px] text-white/70 bg-white/[0.07] rounded-full px-3 py-1">
              Conversation started — AI identifies itself
            </span>
          </motion.div>

          {/* Chat messages */}
          <AnimatePresence mode="popLayout">
            {MESSAGES.slice(0, displayedMessageCount).map((msg, i) => (
              <ChatBubble key={i} message={msg} />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>{displayedTyping && <TypingIndicator />}</AnimatePresence>

          {/* Confirmation banner */}
          <AnimatePresence>
            {displayedConfirmation && <ConfirmedBanner />}
          </AnimatePresence>
        </div>
      </div>

      {/* See Full Demo button */}
      <AnimatePresence>
        {displayedConfirmation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-center"
          >
            <button
              type="button"
              onClick={onSeeFullDemo}
              className="group/btn inline-flex min-h-10 items-center gap-2 text-sm font-medium text-velora-emerald transition-[color,transform] duration-150 hover:text-velora-emerald-dark active:scale-[0.97]"
            >
              Discuss This Workflow
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover/btn:translate-x-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
